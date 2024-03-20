package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.VideoSourceInfoDto;
import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.dto.response.VideoSourceListResponse;
import com.usagi.sorimaeul.entity.Dubbing;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.entity.VideoSource;
import com.usagi.sorimaeul.repository.DubbingRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import com.usagi.sorimaeul.repository.VideoSourceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DubbingServiceImpl implements DubbingService {

    private final UserRepository userRepository;
    private final DubbingRepository dubbingRepository;
    private final VideoSourceRepository videoSourceRepository;

    // 원본 영상 리스트 조회
    public ResponseEntity<VideoSourceListResponse> getVideoSourceList(long userCode, int page){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<VideoSource> videoSources = new ArrayList<>();
        List<VideoSourceInfoDto> customVideoSources = new ArrayList<>();
        // 인덱스 선언
        int startIdx;
        int endIdx;

        // 모든 게시물 조회
        videoSources = videoSourceRepository.findAll();
        startIdx = (page - 1) * 10;
        endIdx = Math.min(startIdx + 10, videoSources.size());

        // 원본 영상 페이지네이션
        List<VideoSource> pageVideoSources = videoSources.subList(startIdx, endIdx);
        // 원본 영상 리스트 순회
        for (VideoSource videoSource : pageVideoSources){
            // Dto 에 담기
            VideoSourceInfoDto videoSourceInfoDto = VideoSourceInfoDto.builder()
                    .videoSourceCode(videoSource.getVideoSourceCode())
                    .sourceName(videoSource.getSourceName())
                    .thumbnailPath(videoSource.getThumbnailPath())
                    .build();
            // customVideoSources 에 담기
            customVideoSources.add(videoSourceInfoDto);
        }

        // Response 생성
        VideoSourceListResponse videoSourceListResponse = VideoSourceListResponse.builder()
                .videoSources(customVideoSources)
                .build();

        return ResponseEntity.ok(videoSourceListResponse);
    }
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
