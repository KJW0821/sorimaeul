package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.entity.Dubbing;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.entity.VideoSource;
import com.usagi.sorimaeul.repository.DubbingRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import com.usagi.sorimaeul.repository.VideoSourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DubbingServiceImpl implements DubbingService {
    private final UserRepository userRepository;
    private final DubbingRepository dubbingRepository;
    private final VideoSourceRepository videoSourceRepository;
    public HttpStatus createDub (long userCode, DubCreateRequest request){
        User user = userRepository.getUser(userCode);
        VideoSource videoSource = videoSourceRepository.findByVideoSourceCode(request.getSourceCode());

        Dubbing dubbing = Dubbing.builder()
                .user(user)
                .videoSource(videoSource)
                .dubName(request.getDubName())
                .build();

        dubbingRepository.save(dubbing);

        return HttpStatus.OK;
    }
}
