package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.DubbingInfoDto;
import com.usagi.sorimaeul.dto.dto.VideoSourceInfoDto;
import com.usagi.sorimaeul.dto.dto.VideoSourceVoiceInfoDto;
import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.dto.response.DubbingDetailResponse;
import com.usagi.sorimaeul.dto.response.DubbingListResponse;
import com.usagi.sorimaeul.dto.response.VideoSourceListResponse;
import com.usagi.sorimaeul.entity.*;
import com.usagi.sorimaeul.repository.DubbingRepository;
import com.usagi.sorimaeul.repository.LikeRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import com.usagi.sorimaeul.repository.VideoSourceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DubbingServiceImpl implements DubbingService {

    private final UserRepository userRepository;
    private final DubbingRepository dubbingRepository;
    private final LikeRepository likeRepository;
    private final VideoSourceRepository videoSourceRepository;
    private final VoiceSourceRepository voiceSourceRepository;

    // 원본 영상 목록 조회
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

    // 원본 영상 상세 조회
    public ResponseEntity<VideoSourceDetailResponse> getVideoSourceDetail(long userCode, int sourceCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        VideoSource videoSource = videoSourceRepository.findByVideoSourceCode(sourceCode);
        // 리스폰스 생성
        VideoSourceDetailResponse response = VideoSourceDetailResponse.builder()
                .videoSourceCode(sourceCode)
                .sourceName(videoSource.getSourceName())
                .sourceDetail(videoSource.getSourceDetail())
                .videoPlaytime(videoSource.getVideoPlaytime())
                .storagePath(videoSource.getStoragePath())
                .thumbnailPath(videoSource.getThumbnailPath())
                .createdTime(videoSource.getCreatedTime())
                .build();

        return ResponseEntity.ok(response);
    }

    // 더빙 영상 목록 조회
    public ResponseEntity<DubbingListResponse> getDubbingList(long userCode, String target, String keyword, int page){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<Dubbing> dubbings = new ArrayList<>();
        List<DubbingInfoDto> customDubbings = new ArrayList<>();
        // 인덱스 선언
        int startIdx = 0;
        int endIdx = 0;
        // 총 페이지 수 선언
        int totalPages = 0;

        // 모든 게시물 조회
        if (target.equals("all")) {
            // keyword 가 null 이면 전체 조회
            if (keyword == null) dubbings = dubbingRepository.findByIsComplete(true);
            // keyword 가 null 이 아니면 dubName = keyword 인 데이터 조회
            else dubbings = dubbingRepository.findByDubNameAndIsComplete(keyword, true);
            // 한 페이지 당 8개씩 조회
            startIdx = (page - 1) * 8;
            endIdx = Math.min(startIdx + 8, dubbings.size());
            // // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) dubbings.size() / 10);
        }

        // 마이 페이지 - 나의 게시물 조회
         else if (target.equals("mine")) {
            dubbings = dubbingRepository.findByUser_userCode(userCode);
            startIdx = (page - 1) * 6;
            endIdx = Math.min(startIdx + 6, dubbings.size());
            // // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) dubbings.size() / 6);
        }

        // 마이 페이지 - 관심 컨텐츠 - 좋아요 누른 게시물 조회
         else if (target.equals("like")){
            // 나의 유저 코드와 일치하는 like 리스트를 가져온다.
            List<Like> likes  = likeRepository.findByUser_userCode(userCode);
            // like 와 매핑되는 Dubbing 들을 dubbings 에 넣는다.
            for (Like like : likes) {
                Dubbing dubbing = like.getDubbing();
                if (dubbing != null) {
                    dubbings.add(dubbing);
                }
            }
            // 한 페이지 당 6개 조회
            startIdx = (page - 1) * 9;
            endIdx = Math.min(startIdx + 6, dubbings.size());
            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) dubbings.size() / 6);
        }

        // 인기 더빙 영상 목록 조회
         else if (target.equals("popular")) {
            // 좋아요 수를 기준으로 상위 5개 항목을 가져온다.
//            dubbings = dubbingRepository.findByTop5OrderByLikeCountDESC();
            dubbings = dubbingRepository.findTop5ByOrderByLikeCountDesc();
            startIdx = 0;
            endIdx = 4;
            // // 총 페이지 수 계산
            totalPages = 1;
        }
        // 최신순으로 보여주기 위해 covers 뒤집기
        reverseList(dubbings);
        // dubbing 리스트 페이지네이션
        List<Dubbing> pageDubbings = dubbings.subList(startIdx, endIdx);
        // dubbing 리스트를 순회
        for (Dubbing dubbing : pageDubbings) {
            // Dto 에 담기
            DubbingInfoDto dubbingInfoDto = DubbingInfoDto.builder()
                    .dubCode(dubbing.getDubCode())
                    .dubName(dubbing.getDubName())
                    .isPublic(dubbing.getIsPublic())
                    .thumbnailPath(dubbing.getVideoSource().getThumbnailPath())
                    .likeCount(dubbing.getLikeCount())
                    .nickname(dubbing.getUser().getNickname())
                    .profileImage(dubbing.getUser().getProfileImage())
                    .build();

        // customDubbings에 담기
        customDubbings.add(dubbingInfoDto);
        }
        // 리스폰스 생성
        DubbingListResponse dubbingListResponse = DubbingListResponse.builder()
                .dubbings(customDubbings)
                .totalPages(totalPages)
                .build();

        return ResponseEntity.ok(dubbingListResponse);
    }

    // 더빙 영상 상세 조회
    public ResponseEntity<DubbingDetailResponse> getDubbingDetail(long userCode, int dubCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);
        // 좋아요 여부 확인
        boolean isLiked;
        if (likeRepository.findByUser_userCodeAndDubbing_dubCode(userCode, dubCode) == null) isLiked = false;
        else isLiked = true;
        // response 생성
        DubbingDetailResponse response = DubbingDetailResponse.builder()
                .dubCode(dubCode)
                .dubName(dubbing.getDubName())
                .storagePath(dubbing.getStoragePath())
                .dubDetail(dubbing.getDubDetail())
                .nickname(dubbing.getUser().getNickname())
                .profileImage(dubbing.getUser().getProfileImage())
                .likeCount(dubbing.getLikeCount())
                .createdTime(dubbing.getCreatedTime())
                .thumbnailPath(dubbing.getVideoSource().getThumbnailPath())
                .isLiked(isLiked)
                .build();

        return ResponseEntity.ok(response);
    }

    // 더빙 영상 등록/수정
    public ResponseEntity<?> patchDubbingBoard(long userCode, int dubCode, DubbingBoardRequest request){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 더빙 영상 수정
        Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);
        dubbing.setDubName(request.getDubName());
        dubbing.setDubDetail(request.getDubDetail());
        dubbing.setVideoSource(videoSourceRepository.findByVideoSourceCode(request.getSourceCode()));
        dubbing.setIsPublic(request.isPublic());
        dubbingRepository.save(dubbing);
        
        return ResponseEntity.status(HttpStatus.OK).body("수정 성공");
    }

    // 더빙 영상 삭제
    public ResponseEntity<?> deleteDubbing(long userCode, int dubCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        
        // 더빙 삭제
        dubbingRepository.deleteById(dubCode);
        
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제 성공");
    }

    // 더빙 영상 분리된 음성 조회
    public ResponseEntity<VideoSourceVoiceResponse> getVideoSourceVoice(long userCode, int sourceCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 음성 조회
        List<VoiceSource> voiceSources = voiceSourceRepository.findByVideoSource_VideoSourceCodeAndVoiceModelIsNull(sourceCode);
        List<VideoSourceVoiceInfoDto> videoSourceVoiceInfoDtos = new ArrayList<>();
        for (VoiceSource voiceSource : voiceSources){
            // Dto에 담기
            VideoSourceVoiceInfoDto videoSourceVoiceInfoDto = VideoSourceVoiceInfoDto.builder()
                    .videoSourceCode(voiceSource.getVoiceSourceCode())
                    .voicePath(voiceSource.getVoicePath())
                    .build();
            videoSourceVoiceInfoDtos.add(videoSourceVoiceInfoDto);
        }
        // 리스폰스 생성
        VideoSourceVoiceResponse response = VideoSourceVoiceResponse.builder()
                .voiceSources(videoSourceVoiceInfoDtos)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 더빙 음성 녹음 업로드
    public ResponseEntity<DubbingRecordResponse> uploadDubbingRecord(long userCode, DubbingRecordRequest request){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
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


    // 리스트 뒤집기
    public void reverseList(List<Dubbing> list) {
        int start = 0;
        int end = list.size() - 1;

        while (start < end) {
            // 리스트의 앞과 뒤 요소를 교환
            Dubbing temp = list.get(start);
            list.set(start, list.get(end));
            list.set(end, temp);

            // 다음 요소로 이동
            start++;
            end--;
        }
    }
}

