package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.entity.Like;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.CoverRepository;
import com.usagi.sorimaeul.repository.DubbingRepository;
import com.usagi.sorimaeul.repository.LikeRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeServiceImpl implements LikeService {

    private final DubbingRepository dubbingRepository;
    private final CoverRepository coverRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;


    // 좋아요 추가, 취소에 따른 cover_tb, dub_tb 의 like_count 칼럼 값 증감은 DB의 Trigger 규칙 설정으로 구현하였습니다.
    // 더빙 좋아요 추가
    public ResponseEntity<?> dubLike(long userCode, int dubCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // Like 생성
        Like like = Like.builder()
                .user(user)
                .dubbing(dubbingRepository.findByDubCode(dubCode))
                .build();
        likeRepository.save(like);

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }


    // AI 커버 좋아요 추가
    public ResponseEntity<?> coverLike(long userCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // Like 생성
        Like like = Like.builder()
                .user(user)
                .cover(coverRepository.findByCoverCode(coverCode))
                .build();
        likeRepository.save(like);

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }


    // 더빙 좋아요 취소
    public ResponseEntity<?> dubLikeCancel(long userCode, int dubCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Like like = likeRepository.findByUser_userCodeAndDubbing_dubCode(userCode, dubCode);
        likeRepository.delete(like);

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }


    // AI 커버 좋아요 취소
    public ResponseEntity<?> coverLikeCancel(long userCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Like like = likeRepository.findByUser_userCodeAndCover_coverCode(userCode, coverCode);
        likeRepository.delete(like);

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
