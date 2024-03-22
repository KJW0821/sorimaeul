package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.ModelInfoDto;
import com.usagi.sorimaeul.dto.dto.ScriptInfoDto;
import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.request.ModelUpdateRequest;
import com.usagi.sorimaeul.dto.response.GetScriptResponse;
import com.usagi.sorimaeul.dto.response.ModelInfoResponse;
import com.usagi.sorimaeul.dto.response.ModelListResponse;
import com.usagi.sorimaeul.dto.response.ModelTableCreateResponse;
import com.usagi.sorimaeul.entity.*;
import com.usagi.sorimaeul.repository.*;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ModelServiceImpl implements ModelService {

    private final UserRepository userRepository;
    private final VoiceModelRepository voiceModelRepository;
    private final VideoSourceRepository videoSourceRepository;
    private final ScriptRepository scriptRepository;
    private static final String BASE_PATH = "/path/to/base/directory";

    // 모델 테이블 생성
    public ResponseEntity<ModelTableCreateResponse> createModelTable(ModelTableCreateRequest request, long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 학습 가능 횟수 예외 처리
        int learnCount = user.getLearnCount();
        if (learnCount <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // 모델 테이블 생성
        // modelCode = auto_increment, video_code = null, storage_path = 임시값, image_path = null, state = 기본값 0,
        // record_count = null, created_time = now()
        VoiceModel voiceModel = VoiceModel.builder()
                .modelName(request.getModelName())
                .user(user)
                .imagePath(request.getImagePath())
                .build();
        voiceModelRepository.save(voiceModel);
        // 리스폰스 생성
        ModelTableCreateResponse response = ModelTableCreateResponse.builder()
                        .modelCode(voiceModel.getModelCode())
                        .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // 음성 녹음 파일 업로드
    public ResponseEntity<String> uploadRecordFile(int modelCode, int num, long userCode, MultipartFile recordingFile) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 모델 학습 가능 횟수 검사
        if (user.getLearnCount() < 1) return ResponseEntity.badRequest().body("모델 학습 가능 횟수가 부족합니다. 상점 페이지에서 구매후 다시 시도해주세요.");
        // 파일 업로드 확인
        if (recordingFile == null || recordingFile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("음성 파일이 업로드되지 않았습니다.");
        }
        // 폴더 경로 설정
        String folderPath = BASE_PATH + "user_" + userCode + "/model_" + modelCode + "/record/";
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
        try {
            // 폴더 생성
            createFolder(folderPath);
            // record_1.wav 형식으로 저장
            String fileName = "record_" + num + ".wav";
            // 파일 생성
            saveFile(folderPath + fileName, recordingFile.getBytes());
            // 녹음 문장 개수 갱신
            countRecord(voiceModel, num);
            return ResponseEntity.ok(num + "번 녹음 파일 업로드 성공!");

        // 서버 오류 처리
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("녹음 파일을 업로드하는 과정에서 오류가 발생했습니다." + e.getMessage());
        }
    }


    // 외부 음성 녹음 파일 업로드
    public ResponseEntity<String> uploadExRecordFile(int modelCode, long userCode, MultipartFile[] files) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 모델 학습 가능 횟수 검사
        if (user.getLearnCount() < 1) return ResponseEntity.badRequest().body("모델 학습 가능 횟수가 부족합니다. 상점 페이지에서 구매후 다시 시도해주세요.");
        // 파일 업로드 확인
        if (files == null || files.length == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("음성 파일이 업로드되지 않았습니다.");
        }
        // 폴더 경로 설정
        String folderPath = BASE_PATH + "user_" + userCode + "/model_" + modelCode + "/record/";
        try {
            // 폴더 생성
            createFolder(folderPath);

            for (int i = 0; i < files.length; i++) {
                // record_1.wav 형식으로 저장
                String fileName = "record_" + (i + 1) + ".wav";
                // 파일 저장
                saveFile(folderPath + fileName, files[i].getBytes());
            }
            
            // state = 1 : '학습전'으로 DB 갱신
            VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
            voiceModel.setState(1);
            voiceModelRepository.save(voiceModel);
            return ResponseEntity.ok("외부 녹음 파일 업로드 성공!");

        // 서버 오류 처리
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("녹음 파일을 업로드하는 과정에서 오류가 발생했습니다." + e.getMessage());
        }
    }


    // 외부 음성 모델 업로드
    public ResponseEntity<String> uploadModelFile(int modelCode, long userCode, MultipartFile[] modelFiles) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 모델 학습 가능 횟수 검사
        if (user.getLearnCount() < 1) return ResponseEntity.badRequest().body("모델 학습 가능 횟수가 부족합니다. 상점 페이지에서 구매후 다시 시도해주세요.");
        // 폴더 경로 설정
        String folderPath = BASE_PATH + "user_" + userCode + "/model_" + modelCode + "/model/";
        try {
            // 폴더 생성
            createFolder(folderPath);
            String fileName;
            for (int i = 0; i < modelFiles.length; i++) {
                // 첫번째 파일은 .pth 파일
                if (i == 0) {fileName = "model.pth";}
                // 두번째 파일은 .index 파일
                else {fileName = "model.index";}
                // 파일 저장
                saveFile(folderPath + fileName, modelFiles[i].getBytes());
            }
            VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
            // 해당 모델의 유저 코드와 모델 파일 경로, 생성시간, 학습상태 DB에 저장
            voiceModel.setStoragePath(folderPath);
            voiceModel.setCreatedTime(LocalDateTime.now());
            voiceModel.setState(3);
            voiceModelRepository.save(voiceModel);
            // 유저 모델 학습 가능 횟수 차감
            user.setLearnCount(user.getLearnCount() - 1);
            return ResponseEntity.ok("모델 파일 업로드 성공!");

        // 서버 오류 처리
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("모델 파일을 업로드하는 과정에서 오류가 발생했습니다." + e.getMessage());
        }
    }


    // 음성 모델 학습 시작
    public ResponseEntity<String> learnVoiceModel(int modelCode, long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 모델 학습 가능 횟수 검사
        if (user.getLearnCount() < 1) return ResponseEntity.badRequest().body("모델 학습 가능 횟수가 부족합니다. 상점 페이지에서 구매후 다시 시도해주세요.");
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
        // 녹음 파일 저장 경로
        String recordFolderPath = BASE_PATH + "user_" + userCode + "/model_" + modelCode + "/record/";
        // 모델 학습 로직 작성


        // state = 2: '학습중'으로 갱신
        voiceModel.setState(2);
        voiceModelRepository.save(voiceModel);

        // 모델 학습 가능 횟수 차감
        user.setLearnCount(user.getLearnCount() - 1);
        userRepository.save(user);

        // 생성된 모델을 서버에 저장
//        uploadModelFile(modelCode, userCode, modelFiles);
        return ResponseEntity.badRequest().body("실패");
    }


    // 모델 조회
    public ResponseEntity<ModelListResponse> getModelList(Integer page, long userCode, Integer videoSourceCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        List<ModelInfoDto> mergedModelList;
        boolean end = false;
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
            // 최신순 조회를 위해 뒤집기
            reverseList(myModelList);
            int startIdx = (page - 1) * 4;
            int endIdx = Math.min(startIdx + 4, myModelList.size());
            mergedModelList = myModelList.subList(startIdx, endIdx);
            end = endIdx >= myModelList.size();

        // page 만 null 이면 더빙 음성 모델 조회(영상 제공 모델, 내가 학습 시킨 모델, 기본 제공 모델)
        } else if (page == null) {
            List<ModelInfoDto> videoSourceModelList = voiceModelRepository.videoSourceModelList(videoSource);
            List<ModelInfoDto> myModelList = voiceModelRepository.userModelList(user, 3);
            List<ModelInfoDto> commonModelList = voiceModelRepository.commonModelList();
            mergedModelList = new ArrayList<>(videoSourceModelList);
            mergedModelList.addAll(myModelList);
            mergedModelList.addAll(commonModelList);
        } else {
            // 잘못된 요청
            return ResponseEntity.badRequest().build();
        }
        
        // 리스폰스 생성
        ModelListResponse modelListResponse = ModelListResponse.builder()
                .voiceModels(mergedModelList)
                .end(end)
                .build();

        return ResponseEntity.ok(modelListResponse);
    }


    // 모델 상세 조회
    public ResponseEntity<ModelInfoResponse> getModelInfo(int modelCode, long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
        long modelUserCode = voiceModel.getUser().getUserCode();
        // 유저 코드가 일치하지 않을 경우 400 반환
        if (modelUserCode != userCode) {
            return ResponseEntity.badRequest().build();
        }
        // 리스폰스 생성
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


    // 모델 수정(모델 이름, 대표 이미지)
    public HttpStatus updateModel(int modelCode, long userCode, ModelUpdateRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return HttpStatus.NOT_FOUND;
        }
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
        long modelUserCode = voiceModel.getUser().getUserCode();
        // 유저 코드가 일치하지 않을 경우 400 반환
        if (modelUserCode != userCode) {
            return HttpStatus.BAD_REQUEST;
        }
        // 모델 이름과 대표 이미지 경로 DB 수정
        voiceModel.setModelName(request.getModelName());
        voiceModel.setImagePath(request.getImagePath());
        voiceModelRepository.save(voiceModel);
        return HttpStatus.OK;
    }


    // 스크립트 조회
    public ResponseEntity<GetScriptResponse> getScript(long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 모든 스크립트 조회
        List<Script> scriptList = scriptRepository.findAll();
        // Dto 형태로 스크립트를 담을 빈 리스트 생성
        List<ScriptInfoDto> scripts = new ArrayList<>();
        // 스크립트 순회
        for (Script script : scriptList) {
            // Dto 에 담기
            ScriptInfoDto scriptInfoDto = ScriptInfoDto.builder()
                    .no(script.getScriptCode())
                    .script(script.getScript())
                    .build();
            // 리스트에 하나씩 추가
            scripts.add(scriptInfoDto);
        }
        // 리스폰스 생성
        GetScriptResponse response = GetScriptResponse.builder()
                .scripts(scripts)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
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
    private void countRecord(VoiceModel voiceModel, int num) {
        voiceModel.setRecordCount(num);
        // 녹음 문장 개수가 200개가 되면 state = 1: '학습전'으로 DB 갱신
        if (num == 200) voiceModel.setState(1);
        voiceModelRepository.save(voiceModel);
    }


    // 리스트 뒤집기
    public void reverseList(List<ModelInfoDto> list) {
        int start = 0;
        int end = list.size() - 1;

        while (start < end) {
            // 리스트의 앞과 뒤 요소를 교환
            ModelInfoDto temp = list.get(start);
            list.set(start, list.get(end));
            list.set(end, temp);

            // 다음 요소로 이동
            start++;
            end--;
        }
    }

}
