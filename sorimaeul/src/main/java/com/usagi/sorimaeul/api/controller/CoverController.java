package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.CoverService;
import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.response.CoverListResponse;
import com.usagi.sorimaeul.dto.response.ModelTableCreateResponse;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cover")
@RequiredArgsConstructor
@Tag(name = "Cover 컨트롤러", description = "AI 커버 관리를 위한 API")
public class CoverController {

    private final JwtTokenProvider jwtTokenProvider;
    private final CoverService coverService;

    @Operation(summary = "AI 커버 목록 조회", description = "AI 커버 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "AI 커버 목록 조회 성공")
    @GetMapping
    public ResponseEntity<CoverListResponse> getCoverList(@RequestHeader("Authorization") String token,
                                                          @RequestParam String target,
                                                          @RequestParam(required = false) String keyword,
                                                          @RequestParam(required = false) int page) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return coverService.getCoverList(userCode, target, keyword, page);
    }
}
