package com.usagi.sorimaeul.repository;


import com.usagi.sorimaeul.dto.request.SignUpRequest;
import com.usagi.sorimaeul.dto.request.NicknameUpdateRequest;
import com.usagi.sorimaeul.dto.response.UserInfoResponse;
import com.usagi.sorimaeul.entity.User;

public interface UserRepositoryCustom {
    User getUser(long userCode);

    void joinUser(SignUpRequest request);

    int checkNickname(String nickname);

    UserInfoResponse getUserInfo(long userCode);

    void setUserInfo(NicknameUpdateRequest request);

}
