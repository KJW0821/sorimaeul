package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.RequestBoardService;
import com.usagi.sorimaeul.dto.response.RequestListResponse;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/request")
@RequiredArgsConstructor
@Tag(name = "Request 컨트롤러", description = "문의(요청) 게시판 관리를 위한 API")
public class RequestController {
    private final JwtTokenProvider jwtTokenProvider;
    private final RequestBoardService requestBoardService;

    @Operation(summary = "문의 게시글 목록 조회", description = "문의 게시글 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "문의 게시글 목록 조회 성공")
    public ResponseEntity<RequestListResponse> getRequestList(@RequestHeader("Authorization") String token,
                                                              @RequestParam(required = false) Integer page,
                                                              @RequestParam(required = false) Integer typeCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return requestBoardService.getRequestList(userCode, typeCode, page);
    }
}
