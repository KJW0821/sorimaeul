package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.OAuthService;
import com.usagi.sorimaeul.dto.response.TokenResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
@Tag(name = "OAuth 컨트롤러", description = "로그인 기능을 위한 API")
public class OAuthController {

    private final OAuthService oAuthService;

    @Operation(summary = "소셜 로그인 페이지로 이동",
            description = "소셜 로그인 페이지로 이동하여 소셜 로그인 후 code 받음")
    @ApiResponse(responseCode = "303", description = "카카오 로그인 페이지로 이동")
    @GetMapping("/code/{provider}")

    public ResponseEntity<?> getCode(@PathVariable String provider) throws URISyntaxException {
        URI redirectUri = oAuthService.getCode(provider);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(redirectUri);

        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }

    @Operation(summary = "로그인",
            description = "소셜 로그인 code를 받아 FATTLE 로그인 실행")
    @ApiResponse(responseCode = "200", description = "토큰 제공")
    @GetMapping("/login/{provider}")
    public ResponseEntity<?> login(@PathVariable String provider,
                                   @RequestParam("code") String code) {
        TokenResponse response = oAuthService.login(provider, code);

        return ResponseEntity.ok(response);
    }
}
