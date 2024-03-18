package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.CoverInfoDto;
import com.usagi.sorimaeul.dto.response.CoverListResponse;
import com.usagi.sorimaeul.entity.Cover;
import com.usagi.sorimaeul.entity.Like;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.CoverRepository;
import com.usagi.sorimaeul.repository.LikeRepository;
import com.usagi.sorimaeul.repository.UserRepository;
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
public class CoverServiceImpl implements CoverService {

    private final CoverRepository coverRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

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
            // like 와 매핑되는 Cover 들을 cover 에 넣는다.
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
//            boolean isLiked;
//            // LikeCount 가 1 이상이면 isLiked = true
//            if (cover.getLikeCount() > 0) isLiked = true;
//            // 0이면 isLiked = false
//            else isLiked = false;
            // Dto 에 담기
            CoverInfoDto coverInfoDto = CoverInfoDto.builder()
                    .coverCode(cover.getCoverCode())
                    .coverName(cover.getCoverName())
                    .storagePath(cover.getStoragePath())
                    .isPublic(cover.isPublic())
                    .likeCount(cover.getLikeCount())
                    .thumbnailPath(cover.getThumbnailPath())
//                    .isLiked(isLiked)
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

}
