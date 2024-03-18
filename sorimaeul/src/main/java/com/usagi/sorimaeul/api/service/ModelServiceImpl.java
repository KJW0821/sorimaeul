package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.ModelInfoDto;
import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.request.ModelUpdateRequest;
import com.usagi.sorimaeul.dto.response.ModelInfoResponse;
import com.usagi.sorimaeul.dto.response.ModelListResponse;
import com.usagi.sorimaeul.dto.response.ModelTableCreateResponse;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.entity.VideoSource;
import com.usagi.sorimaeul.entity.VoiceModel;
import com.usagi.sorimaeul.repository.UserRepository;
import com.usagi.sorimaeul.repository.VideoSourceRepository;
import com.usagi.sorimaeul.repository.VoiceModelRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ModelServiceImpl implements ModelService {

    private final UserRepository userRepository;
    private final VoiceModelRepository voiceModelRepository;
    private final VideoSourceRepository videoSourceRepository;
    private static final String BASE_PATH = "/path/to/base/directory";

    // 모델 테이블 생성
    public ResponseEntity<ModelTableCreateResponse> createModelTable(ModelTableCreateRequest request, long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // modelCode = auto_increment, video_code = null, storage_path = 임시값, image_path = null, state = 기본값 0,
        // record_count = null, created_time = now()
        VoiceModel voiceModel = VoiceModel.builder()
                .modelName(request.getModelName())
                .user(user)
                .storagePath(request.getImagePath())
                .build();
        voiceModelRepository.save(voiceModel);
        ModelTableCreateResponse response = ModelTableCreateResponse.builder()
                        .modelCode(voiceModel.getModelCode())
                        .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // 음성 녹음 파일 업로드
    public ResponseEntity<String> uploadRecordFile(int modelCode, int num, long userCode, MultipartFile recordingFile) {
        // 폴더 경로 설정
        String folderPath = BASE_PATH + "user_" + userCode + "/model_" + modelCode + "/";
        try {
            createFolder(folderPath);
            // record_1.wav 형식으로 저장
            String fileName = "record_" + num + ".wav";
            saveFile(folderPath + fileName, recordingFile.getBytes());
            countRecord(modelCode, num);
            return ResponseEntity.ok("Recording file saved successfully with name: " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while saving recording file: " + e.getMessage());
        }
    }


//    public ResponseEntity<?>


    // 폴더 생성
    private void createFolder(String folderPath) throws IOException {
        Path path = Paths.get(folderPath);
        if (!Files.exists(path)) Files.createDirectories(path);
    }


    // 파일 저장
    private void saveFile(String filePath, byte[] data) throws IOException {
        Path path = Paths.get(filePath);
        Files.write(path, data);
    }


    // 녹음 문장 개수(record_count) 갱신
    private void countRecord(int modelCode, int num) {
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
        voiceModel.setRecordCount(num);
        voiceModelRepository.save(voiceModel);
    }


    // 모델 조회
    public ResponseEntity<ModelListResponse> getModelList(Integer page, long userCode, Integer videoSourceCode) {
        List<ModelInfoDto> mergedModelList;
        boolean end = false;
        User user = userRepository.getUser(userCode);
        VideoSource videoSource = videoSourceRepository.findByVideoSourceCode(videoSourceCode);


        // videoSourceCode 와 page 가 모두 null 이면 AI 커버 음성 모델 조회(기본 제공 모델, 내가 학습 시킨 모델)
        if (page == null && videoSourceCode == null) {
            List<ModelInfoDto> commonModelList = voiceModelRepository.commonModelList();
            List<ModelInfoDto> myModelList = voiceModelRepository.userModelList(user, 3);
            mergedModelList = new ArrayList<>(commonModelList);
            mergedModelList.addAll(myModelList);

        // videoSourceCode 만 null 이면 마이페이지 음성 모델 조회(페이지 네이션, 내가 학습 시킨 모델)
        } else if (videoSourceCode == null) {
            List<ModelInfoDto> myModelList = voiceModelRepository.userModelList(user, -1);
            int startIdx = (page - 1) * 4;
            int endIdx = Math.min(startIdx + 4, myModelList.size());
            mergedModelList = myModelList.subList(startIdx, endIdx);
            end = endIdx >= myModelList.size();

        // page 만 null 이면 더빙 음성 모델 조회(영상 제공 모델, 내가 학습 시킨 모델)
        } else if (page == null) {
            List<ModelInfoDto> videoSourceModelList = voiceModelRepository.videoSourceModelList(videoSource);
            List<ModelInfoDto> myModelList = voiceModelRepository.userModelList(user, 3);
            mergedModelList = new ArrayList<>(videoSourceModelList);
            mergedModelList.addAll(myModelList);
        } else {
            // 잘못된 요청
            return ResponseEntity.badRequest().build();
        }

        ModelListResponse modelListResponse = ModelListResponse.builder()
                .voiceModels(mergedModelList)
                .end(end)
                .build();

        return ResponseEntity.ok(modelListResponse);
    }


    // 모델 상세 조회
    public ResponseEntity<ModelInfoResponse> getModelInfo(int modelCode, long userCode) {
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
        long modelUserCode = voiceModel.getUser().getUserCode();
        if (modelUserCode != userCode) {
            return ResponseEntity.badRequest().build();
        }
        ModelInfoResponse response = ModelInfoResponse.builder()
                .modelCode(voiceModel.getModelCode())
                .modelName(voiceModel.getModelName())
                .storagePath(voiceModel.getStoragePath())
                .imagePath(voiceModel.getImagePath())
                .recordCount(voiceModel.getRecordCount())
                .state(voiceModel.getState())
                .build();

        return ResponseEntity.ok(response);
    }


    public HttpStatus updateModel(int modelCode, long userCode, ModelUpdateRequest request) {
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
        long modelUserCode = voiceModel.getUser().getUserCode();
        if (modelUserCode != userCode) {
            return HttpStatus.BAD_REQUEST;
        }
        voiceModel.setModelName(request.getModelName());
        voiceModel.setImagePath(request.getImagePath());
        voiceModelRepository.save(voiceModel);
        return HttpStatus.OK;
    }
}
