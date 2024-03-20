package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.PlaylistService;
import com.usagi.sorimaeul.dto.response.PlaylistListResponse;
import com.usagi.sorimaeul.repository.UserRepository;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/playlist")
@RequiredArgsConstructor
@Tag(name = "Playlist 컨트롤러", description = "플레이리스트 관리를 위한 API")
public class PlaylistController {

    private final JwtTokenProvider jwtTokenProvider;
    private final PlaylistService playlistService;

    @Operation(summary = "플레이리스트 목록 조회", description = "유저 코드로 플레이리스트 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "플레이리스트 목록 조회 성공")
    @GetMapping
    public ResponseEntity<PlaylistListResponse> getPlaylistList(@RequestHeader(name = "Authorization") String token) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return playlistService.getPlaylistList(userCode);
    }

}
