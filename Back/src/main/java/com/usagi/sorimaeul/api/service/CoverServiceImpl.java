package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.CoverInfoDto;
import com.usagi.sorimaeul.dto.request.CoverBoardRequest;
import com.usagi.sorimaeul.dto.request.CoverCreateRequest;
import com.usagi.sorimaeul.dto.response.CoverDetailResponse;
import com.usagi.sorimaeul.dto.response.CoverListResponse;
import com.usagi.sorimaeul.entity.Cover;
import com.usagi.sorimaeul.entity.Like;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.entity.VoiceModel;
import com.usagi.sorimaeul.repository.CoverRepository;
import com.usagi.sorimaeul.repository.LikeRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import com.usagi.sorimaeul.repository.VoiceModelRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CoverServiceImpl implements CoverService {

    private final CoverRepository coverRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final VoiceModelRepository voiceModelRepository;


    // AI 커버 리스트 조회
    public ResponseEntity<CoverListResponse> getCoverList(long userCode, String target, String keyword, int page) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<Cover> covers = new ArrayList<>();
        List<CoverInfoDto> customCovers = new ArrayList<>();
        // 인덱스 선언
        int startIdx;
        int endIdx;

        // 모든 게시물 조회
        if (target.equals("all")) {
            // keyword 가 null 이면 전체 조회
            if (keyword == null) covers = coverRepository.findAll();
            // keyword 가 null 이 아니면 CoverName = keyword 인 데이터 조회
            else covers = coverRepository.findByCoverName(keyword);
            // 한 페이지 당 10개씩 조회
            startIdx = (page - 1) * 10;
            endIdx = Math.min(startIdx + 10, covers.size());
        // 마이 페이지 - 나의 게시물 조회
        } else if (target.equals("mine")) {
            covers = coverRepository.findByUser_userCode(userCode);
            // 한 페이지 당 6개씩 조회
            startIdx = (page - 1) * 6;
            endIdx = Math.min(startIdx + 6, covers.size());
        // 마이 페이지 - 관심 컨텐츠 - 좋아요 누른 게시물 조회
        } else {
            // 나의 유저 코드와 일치하는 like 리스트를 가져온다.
            List<Like> likes = likeRepository.findByUser_userCode(userCode);
            // like 와 매핑되는 Cover 들을 covers 에 넣는다.
            for (Like like : likes) {
                Cover cover = like.getCover();
                if (cover != null) {
                    covers.add(cover);
                }
            }
            // 한 페이지 당 6개씩 조회
            startIdx = (page - 1) * 6;
            endIdx = Math.min(startIdx + 6, covers.size());
        }
        // cover 리스트 페이지네이션
        List<Cover> pageCovers = covers.subList(startIdx, endIdx);
        // cover 리스트를 순회
        for (Cover cover : pageCovers) {
            // Dto 에 담기
            CoverInfoDto coverInfoDto = CoverInfoDto.builder()
                    .coverCode(cover.getCoverCode())
                    .coverName(cover.getCoverName())
                    .storagePath(cover.getStoragePath())
                    .isPublic(cover.isPublic())
                    .likeCount(cover.getLikeCount())
                    .thumbnailPath(cover.getThumbnailPath())
                    .nickname(cover.getUser().getNickname())
                    .coverSinger(cover.getCoverSinger())
                    .singer(cover.getSinger())
                    .title(cover.getTitle())
                    .build();
            // customCovers 에 담기
            customCovers.add(coverInfoDto);
        }

        // 리스폰스 생성
        CoverListResponse coverListResponse = CoverListResponse.builder()
                .covers(customCovers)
                .build();

        return ResponseEntity.ok(coverListResponse);
    }


    // AI 커버 상세 조회
    public ResponseEntity<CoverDetailResponse> getCoverDetail(long userCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Cover cover = coverRepository.findByCoverCode(coverCode);
        // 좋아요 여부 확인
        boolean isLiked;
        if (likeRepository.findByUser_userCodeAndCover_coverCode(userCode, coverCode) == null) isLiked = false;
        else isLiked = true;
        // 리스폰스 생성
        CoverDetailResponse response = CoverDetailResponse.builder()
                .coverCode(coverCode)
                .coverName(cover.getCoverName())
                .storagePath(cover.getStoragePath())
                .thumbnailPath(cover.getThumbnailPath())
                .isLiked(isLiked)
                .build();

        return ResponseEntity.ok(response);
    }


    // AI 커버 생성
    public ResponseEntity<?> createCover(long userCode, CoverCreateRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // AI 커버 생성 로직 작성
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(request.getModelCode());


        // coverCode 자동 생성, coverDetail, thumbnailPath 나중에 입력, createdTime, updatedTime 현재 시간, likeCount 기본값 0
        // isPublic 기본값 false
        Cover cover = Cover.builder()
                .user(user)
                .coverName(request.getCoverName())
                .coverSinger(voiceModel.getModelName())
                .singer(request.getSinger())
                .title(request.getTitle())
//                .storagePath()
                .build();
        coverRepository.save(cover);

        return ResponseEntity.status(HttpStatus.CREATED).body("생성 성공");
    }


    // AI 커버 등록/수정
    public ResponseEntity<?> createCoverBoard(long userCode, int coverCode, CoverBoardRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 커버 수정
        Cover cover = coverRepository.findByCoverCode(coverCode);
        cover.setCoverName(request.getCoverName());
        cover.setCoverDetail(request.getCoverDetail());
        cover.setThumbnailPath(request.getThumbnailPath());
        cover.setPublic(request.isPublic());
        coverRepository.save(cover);

        return ResponseEntity.status(HttpStatus.OK).body("수정 성공");

    }


    // AI 커버 게시글 삭제
    public ResponseEntity<?> deleteCover(long userCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 커버 삭제
        coverRepository.deleteById(coverCode);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제 성공");
    }

}
