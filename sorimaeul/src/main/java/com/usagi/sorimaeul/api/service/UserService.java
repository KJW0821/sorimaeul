package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.ProfileImageUpdateRequest;
import com.usagi.sorimaeul.dto.request.SignUpRequest;
import com.usagi.sorimaeul.dto.request.NicknameUpdateRequest;
import com.usagi.sorimaeul.dto.response.UserInfoResponse;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User login(long userCode) {
        return userRepository.getUser(userCode);
    }

    public void signUp(SignUpRequest signUpRequest) { userRepository.joinUser(signUpRequest); }

    public HttpStatus checkNickname(String nickname) {
        int cnt = userRepository.checkNickname(nickname);

        if (cnt == 0) return HttpStatus.OK;
        else return HttpStatus.NOT_ACCEPTABLE;
    }

    public UserInfoResponse userInfo(long userCode) { return userRepository.getUserInfo(userCode); }

    public HttpStatus nicknameUpdate(NicknameUpdateRequest nicknameUpdateRequest, long userCode) {
        User user = userRepository.getUser(userCode);

        if (user == null) return HttpStatus.BAD_REQUEST;
        else {
            user.setNickname(nicknameUpdateRequest.getNickname());
            userRepository.save(user);
            return HttpStatus.OK;
        }
    }

    public HttpStatus profileImageUpdate(ProfileImageUpdateRequest profileImageUpdateRequest, long userCode) {
        User user = userRepository.getUser(userCode);

        if (user == null) return HttpStatus.BAD_REQUEST;
        else {
            user.setProfileImage(profileImageUpdateRequest.getProfileImage());
            userRepository.save(user);
            return HttpStatus.OK;
        }
    }


}
