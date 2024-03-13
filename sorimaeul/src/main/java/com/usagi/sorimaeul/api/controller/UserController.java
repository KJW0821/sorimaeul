package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.UserService;
import com.usagi.sorimaeul.dto.request.ProfileImageUpdateRequest;
import com.usagi.sorimaeul.dto.request.SignUpRequest;
import com.usagi.sorimaeul.dto.request.NicknameUpdateRequest;
import com.usagi.sorimaeul.dto.response.UserInfoResponse;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Tag(name = "User 컨트롤러", description = "사용자 관리를 위한 API")
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;


    @Operation(summary = "로그인",
            description = "유저 코드를 통해 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "204", description = "회원가입 필요")
    })
    @GetMapping("/login/{userCode}")
    public ResponseEntity<?> login(@PathVariable long userCode) {
        return ResponseEntity.status(userService.login(userCode)).build();
    }

    @Operation(summary = "회원가입",
            description = "유저 정보를 받아 회원가입")
    @ApiResponse(responseCode = "201", description = "회원가입 성공")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
        userService.signUp(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "닉네임 중복 확인",
            description = "기존에 존재하는 닉네임인지 확인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "닉네임 사용 가능"),
            @ApiResponse(responseCode = "204", description = "닉네임 중복")
    })
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
        return ResponseEntity.status(userService.checkNickname(nickname)).build();
    }

    @Operation(summary = "유저 정보",
            description = "유저 코드를 받아 유저 정보를 응답")
    @ApiResponse(responseCode = "200", description = "유저 정보 응답")
    @GetMapping("/info")
    public ResponseEntity<UserInfoResponse> userInfo(@RequestHeader("Authorization") String token) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        UserInfoResponse response = userService.userInfo(userCode);
        return ResponseEntity.ok(response);
    }


    @Operation(summary = "유저 닉네임 수정",
            description = "유저의 닉네임 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "유저 닉네임 수정 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 유저")
    })
    @PatchMapping("/nickname")
    public ResponseEntity<?> nicknameUpdate(@RequestHeader("Authorization") String token,
                                            @RequestBody NicknameUpdateRequest nicknameUpdateRequest) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        HttpStatus status = userService.nicknameUpdate(nicknameUpdateRequest, userCode);
        return ResponseEntity.status(status).build();
    }

    @Operation(summary = "유저 프로필 이미지 수정",
            description = "유저의 프로필 이미지 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "유저 프로필 이미지 수정 성공"),
            @ApiResponse(responseCode = "400", description = "존재하지 않는 유저")
    })
    @PatchMapping("/image")
    public ResponseEntity<?> profileImageUpdate(@RequestHeader("Authorization") String token,
                                                @RequestBody ProfileImageUpdateRequest profileImageUpdateRequest) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        HttpStatus status = userService.profileImageUpdate(profileImageUpdateRequest, userCode);
        return ResponseEntity.status(status).build();
    }

    // 테스트를 위한 유저코드를 통해 토큰을 확인하는 함수 작성
    @Operation(summary = "유저 토큰 조회",
            description = "유저 토큰 조회")
    @ApiResponse(responseCode = "200", description = "토큰 조회 성공")
    @GetMapping( "/token/{userCode}")
    public String getUserToken(@PathVariable long userCode) {
        String accessToken = jwtTokenProvider.createAccessToken(String.valueOf(userCode));
        return accessToken;
    }
}
