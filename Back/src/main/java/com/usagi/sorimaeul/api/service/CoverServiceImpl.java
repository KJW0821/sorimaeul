package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.CoverInfoDto;
import com.usagi.sorimaeul.dto.request.CoverBoardRequest;
import com.usagi.sorimaeul.dto.request.CoverCreateRequest;
import com.usagi.sorimaeul.dto.response.CoverCreateResponse;
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
import static com.usagi.sorimaeul.utils.Const.*;
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
    public ResponseEntity<CoverListResponse> getCoverList(long userCode, String target, String keyword, Integer page) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<Cover> covers = new ArrayList<>();
        List<CoverInfoDto> customCovers = new ArrayList<>();
        // 인덱스 선언
        int startIdx = 0;
        int endIdx = 0;
        // 총 페이지 수 선언
        int totalPages = 1;
        // 모든 게시물 조회
        if (target.equals("all")) {
            // keyword 가 null 이면 전체 조회, isComplete = true : 제작 완료된 게시물만
            if (keyword == null) covers = coverRepository.findByIsCompleteAndIsPublic(true, true);
            // keyword 가 null 이 아니면 CoverName = keyword 인 데이터 조회, isComplete = true : 제작 완료된 게시물만, isPublic = true : 공개 설정된 게시물만
            else covers = coverRepository.findByCoverNameContainingAndIsCompleteAndIsPublic(keyword, true, true);
            // page 가 null 이 아니면
            if (page != null) {
                // 한 페이지 당 10개씩 조회
                startIdx = Math.min((page - 1) * 10, covers.size()) / 10 * 10;
                endIdx = Math.min(startIdx + 10, covers.size());
            }
            // page 가 null 이면 전체 조회
            else {
                endIdx = covers.size();
            }
            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) covers.size() / 10);

        // 마이 페이지 - 나의 게시물 조회
        } else if (target.equals("mine")) {
            covers = coverRepository.findByUser_userCode(userCode);
            // page 가 null 이 아니면
            if (page != null) {
            // 한 페이지 당 6개씩 조회
                startIdx = Math.min((page - 1) * 6, covers.size()) / 6 * 6;
                endIdx = Math.min(startIdx + 6, covers.size());
            }
            // page 가 null 이면 전체 조회
            else {
                endIdx = covers.size();
            }
            // // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) covers.size() / 6);

        // 마이 페이지 - 관심 컨텐츠 - 좋아요 누른 게시물 조회
        } else if (target.equals("like")){
            // 나의 유저 코드와 일치하는 like 리스트를 가져온다. (isComplete 처리를 하지 않은 이유 : 제작 완료되지 않은 게시물에 좋아요를 누를 수 없다.)
            List<Like> likes = likeRepository.findByUser_userCode(userCode);
            // like 와 매핑되는 Cover 들을 covers 에 넣는다.
            for (Like like : likes) {
                Cover cover = like.getCover();
                // 공개 설정, 제작 완료된 것만 추가
                if (cover != null && cover.isPublic() && cover.isComplete()) {
                    covers.add(cover);
                }
            }
            // page 가 null 이 아니면
            if (page != null) {
                // 한 페이지 당 6개씩 조회
                startIdx = Math.min((page - 1) * 6, covers.size()) / 6 * 6;
                endIdx = Math.min(startIdx + 6, covers.size());
            }
            // page 가 null 이면 전체 조회
            else {
                endIdx = covers.size();
            }

            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) covers.size() / 6);

        // 인기 게시글 조회
        } else if (target.equals("popular")) {
            // 커버 게시글 좋아요 순, 최신 순으로 5개 조회
            covers = coverRepository.findTop5ByOrderByLikeCountDescCoverCodeDesc();
            // 인덱스 0 ~ covers.size() 로 정의
            endIdx = covers.size();
        }
        // 최신순으로 보여주기 위해 covers 뒤집기
        if (!target.equals("popular")) reverseList(covers);
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
                    .profileImage(cover.getUser().getProfileImage())
                    .coverSinger(cover.getCoverSinger())
                    .singer(cover.getSinger())
                    .title(cover.getTitle())
                    .isComplete(cover.isComplete())
                    .build();
            // customCovers 에 담기
            customCovers.add(coverInfoDto);
        }

        // 리스폰스 생성
        CoverListResponse coverListResponse = CoverListResponse.builder()
                .covers(customCovers)
                .totalPages(totalPages)
                .build();

        return ResponseEntity.ok(coverListResponse);
    }


    // AI 커버 상세 조회
    public ResponseEntity<?> getCoverDetail(long userCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Cover cover = coverRepository.findByCoverCode(coverCode);
        // 비공개인데 작성자가 아닌 경우 BadRequest 반환
        if (!cover.isPublic() && cover.getUser() != user)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("접근이 불가능한 AI 커버입니다.");

        boolean isLiked;
//            // LikeCount 가 1 이상이면 isLiked = true
            if (cover.getLikeCount() > 0) isLiked = true;
//            // 0이면 isLiked = false
            else isLiked = false;
        // 리스폰스 생성
        CoverDetailResponse response = CoverDetailResponse.builder()
                .coverName(cover.getCoverName())
                .coverDetail(cover.getCoverDetail())
                .storagePath(cover.getStoragePath())
                .likeCount(cover.getLikeCount())
                .thumbnailPath(cover.getThumbnailPath())
                .nickname(cover.getUser().getNickname())
                .profileImage(cover.getUser().getProfileImage())
                .coverSinger(cover.getCoverSinger())
                .singer(cover.getSinger())
                .title(cover.getTitle())
                .isLiked(isLiked)
                .isComplete(cover.isComplete())
                .build();

        return ResponseEntity.ok(response);
    }


    // AI 커버 생성
    public ResponseEntity<CoverCreateResponse> createCover(long userCode, CoverCreateRequest request) {
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
                .build();
        coverRepository.save(cover);
        int coverCode = cover.getCoverCode();
        cover.setStoragePath(BASE_PATH);
        CoverCreateResponse response = CoverCreateResponse.builder()
                .coverCode(coverCode)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // AI 커버 등록/수정
    public ResponseEntity<?> createCoverBoard(long userCode, int coverCode, CoverBoardRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Cover cover = coverRepository.findByCoverCode(coverCode);
        // 클라이언트와 커버 생성자 일치하지 않으면 400 반환
        User coverCreator = cover.getUser();
        if (coverCreator != user) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // 커버 수정
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

        Cover cover = coverRepository.findByCoverCode(coverCode);
        // 클라이언트와 커버 생성자 일치하지 않으면 400 반환
        User coverCreator = cover.getUser();
        if (coverCreator != user) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // 커버 삭제
        coverRepository.deleteById(coverCode);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제 성공");
    }

    public void reverseList(List<Cover> list) {
        int start = 0;
        int end = list.size() - 1;

        while (start < end) {
            // 리스트의 앞과 뒤 요소를 교환
            Cover temp = list.get(start);
            list.set(start, list.get(end));
            list.set(end, temp);

            // 다음 요소로 이동
            start++;
            end--;
        }
    }

}
