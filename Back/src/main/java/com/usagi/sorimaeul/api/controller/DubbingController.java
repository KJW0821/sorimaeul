package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.DubbingService;
import com.usagi.sorimaeul.api.service.UserService;
import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.Token;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dub")
@Tag(name = "Dub 컨트롤러", description = "더빙학원 기능을 위한 API")
public class DubbingController {

    private final JwtTokenProvider jwtTokenProvider;
    private final DubbingService dubbingService;

    @PostMapping("/create")
    public ResponseEntity<Void> createDub(DubCreateRequest dubCreateRequest, @RequestHeader("Authorization") String token){
        // API 요청 시 헤더 중 Authorization 키에 담긴 값을 받아옴
        // 유저 코드 받아오기
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));

        HttpStatus status = dubbingService.createDub(userCode, dubCreateRequest);

        return ResponseEntity.status(status).build();
    }
}
