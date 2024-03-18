package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.NotifyService;
import com.usagi.sorimaeul.dto.response.NotifyResponse;
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
@RequestMapping("/notify")
@RequiredArgsConstructor
@Tag(name = "Notify 컨트롤러", description = "알림 처리를 위한 컨트롤러")
public class NotifyController {

	private final NotifyService notifyService;
	private final JwtTokenProvider jwtTokenProvider;

	@Operation(summary = "알림 리스트 조회",
			description = "해당 유저의 알림 리스트 조회")
	@ApiResponse(responseCode = "200", description = "알림 리스트 조회 성공")
	@GetMapping
	public ResponseEntity<NotifyResponse> getNotify(@RequestHeader("Authorization") String token) {
		long userCode = Long.parseLong(jwtTokenProvider.getPayload(token).substring(7));
		NotifyResponse response = notifyService.getNotify(userCode);
		return ResponseEntity.ok(response);
	}

}
