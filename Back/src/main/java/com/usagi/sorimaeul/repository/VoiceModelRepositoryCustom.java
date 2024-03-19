package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.dto.dto.ModelInfoDto;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.entity.VideoSource;

import java.util.List;

public interface VoiceModelRepositoryCustom {

    // 유저가 학습 시킨 모델 가져오기
    List<ModelInfoDto> userModelList(User user, int state);

    // 영상 소스 제공 모델 가져오기
    List<ModelInfoDto> videoSourceModelList(VideoSource videoSource);

    // 기본 모델 가져오기
    List<ModelInfoDto> commonModelList();

}
