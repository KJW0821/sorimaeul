package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.RequestInfoDto;
import com.usagi.sorimaeul.dto.response.RequestListResponse;
import com.usagi.sorimaeul.entity.RequestBoard;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.RequestBoardRepository;
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
public class RequestBoardServiceImpl implements RequestBoardService {

    private final UserRepository userRepository;
    private final RequestBoardRepository requestBoardRepository;

    // 문의 게시판 리스트 조회
    public ResponseEntity<RequestListResponse> getRequestList(long userCode, Integer typeCode, Integer page){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<RequestBoard> requests = requestBoardRepository.findByTypeCodeOrderByCreatedTime(typeCode);
        List<RequestInfoDto> customRequests = new ArrayList<>();

        // 인덱스 선언
        int startIdx = Math.min((page - 1) * 7, requests.size()) / 7 * 7;
        int endIdx = Math.min(startIdx + 7, requests.size());
        // 총 페이지 수 선언
        int totalPages = (int) Math.ceil((double) requests.size() / 7);

        List<RequestBoard> pageRequests = requests.subList(startIdx, endIdx);

        for (RequestBoard request : pageRequests) {
            // Dto 에 담기
            RequestInfoDto requestInfoDto = RequestInfoDto.builder()
                    .boardCode(request.getBoardCode())
                    .title(request.getTitle())
                    .createdTime(request.getCreatedTime())
                    .build();

            customRequests.add(requestInfoDto);
        }

        // response 생성
        RequestListResponse response = RequestListResponse.builder()
                .requests(customRequests)
                .totalPages(totalPages)
                .build();

        return ResponseEntity.ok(response);
    }
}
