package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.response.ModelTableCreateResponse;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.entity.VoiceModel;
import com.usagi.sorimaeul.repository.UserRepository;
import com.usagi.sorimaeul.repository.VoiceModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModelServiceImpl implements ModelService {

    private final UserRepository userRepository;
    private final VoiceModelRepository voiceModelRepository;

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
}
