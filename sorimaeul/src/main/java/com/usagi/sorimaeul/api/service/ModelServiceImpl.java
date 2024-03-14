package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.ModelInfoDto;
import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.response.ModelListResponse;
import com.usagi.sorimaeul.dto.response.ModelTableCreateResponse;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.entity.VoiceModel;
import com.usagi.sorimaeul.repository.UserRepository;
import com.usagi.sorimaeul.repository.VoiceModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ModelServiceImpl implements ModelService {

    private final UserRepository userRepository;
    private final VoiceModelRepository voiceModelRepository;
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
                .storagePath("test")
                .build();
        voiceModelRepository.save(voiceModel);
        ModelTableCreateResponse response = ModelTableCreateResponse.builder()
                        .modelCode(voiceModel.getModelCode())
                        .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    public ResponseEntity<String> uploadFile(int modelCode, int num, long userCode, MultipartFile recordingFile) {
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


    public ResponseEntity<ModelListResponse> getModelResponse(int page, long userCode, int videoSourceCode) {
        List<ModelInfoDto> modelList = voiceModelRepository.getModelList(userCode, videoSourceCode);
        boolean end = modelList.size() <= 4 * page;
        List<ModelInfoDto> modelListInfo;
        if (!end) {
            modelListInfo = modelList.subList(4 * (page - 1), 4 * page);
        } else {
            modelListInfo = modelList.subList(4 * (page - 1), modelList.size());
        }
        ModelListResponse modelListResponse = ModelListResponse.builder()
                .voiceModels(modelListInfo)
                .end(end)
                .build();
        return ResponseEntity.ok(modelListResponse);
    }
}
