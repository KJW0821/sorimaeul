package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.CommentInfoDto;
import com.usagi.sorimaeul.dto.response.CommentListResponse;
import com.usagi.sorimaeul.entity.Comment;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.CommentRepository;
import com.usagi.sorimaeul.repository.CoverRepository;
import com.usagi.sorimaeul.repository.DubbingRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final CoverRepository coverRepository;
    private final DubbingRepository dubbingRepository;


    // AI 커버 댓글 조회
    public ResponseEntity<CommentListResponse> getCoverCommentList(long userCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // coverCode 일치하는 댓글 가져오기
        List<Comment> commentList = commentRepository.findByCover_CoverCode(coverCode);
        // 빈 CommentInfoDto 리스트 생성
        List<CommentInfoDto> comments = new ArrayList<>();

        // 댓글 리스트 순회하면서
        for (Comment comment : commentList) {
            // Dto 생성
            CommentInfoDto commentInfoDto = CommentInfoDto.builder()
                    .content(comment.getContent())
                    .time(formatElapsedTime(comment.getCreatedTime()))
                    .build();
            // comments 에 담기
            comments.add(commentInfoDto);
        }

        CommentListResponse response = CommentListResponse.builder()
                .comments(comments)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // 더빙 댓글 조회
    public ResponseEntity<CommentListResponse> getDubCommentList(long userCode, int dubCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // dubCode 일치하는 댓글 가져오기
        List<Comment> commentList = commentRepository.findByDubbing_DubCode(dubCode);
        // 빈 CommentInfoDto 리스트 생성
        List<CommentInfoDto> comments = new ArrayList<>();

        // 댓글 리스트 순회하면서
        for (Comment comment : commentList) {
            // Dto 생성
            CommentInfoDto commentInfoDto = CommentInfoDto.builder()
                    .content(comment.getContent())
                    .time(formatElapsedTime(comment.getCreatedTime()))
                    .build();
            // comments 에 담기
            comments.add(commentInfoDto);
        }

        CommentListResponse response = CommentListResponse.builder()
                .comments(comments)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    

    // LocalDateTime 을 "방금 전", "5분 전", "1시간 전", "30일 전" 의 형태로 변환
    public static String formatElapsedTime(LocalDateTime commentTime) {
        LocalDateTime currentTime = LocalDateTime.now();
        Duration duration = Duration.between(commentTime, currentTime);
        long seconds = duration.getSeconds();
        long minutes = TimeUnit.SECONDS.toMinutes(seconds);
        long hours = TimeUnit.SECONDS.toHours(seconds);
        long days = TimeUnit.SECONDS.toDays(seconds);

        if (seconds < 60) {
            return "방금전";
        } else if (minutes < 60) {
            return minutes + "분 전";
        } else if (hours < 24) {
            return hours + "시간 전";
        } else if (days == 1) {
            return "어제";
        } else if (days <= 30) {
            return days + "일 전";
        } else {
            return "오래전"; // 30일 초과는 오래전 으로 변환
        }
    }

    public static void main(String[] args) {
        LocalDateTime commentTime = LocalDateTime.of(2024, 2, 1, 12, 30);
        System.out.println(formatElapsedTime(commentTime)); // 예시 시간을 넣어서 출력해봅니다.
    }

}