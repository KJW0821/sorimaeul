package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.SseService;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
@RequiredArgsConstructor
@Tag(name = "SSE 컨트롤러", description = "SSE 통신을 위한 컨트롤러")
public class SseController {

	@Value("${sse.time-out}")
	private final long TIME_OUT;

	private final SseService sseService;

	private final JwtTokenProvider jwtTokenProvider;

	@Operation(summary = "SSE 연결 요청",
			description = "SSE 연결 요청")
	@GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public SseEmitter connect(@RequestHeader("Authorization") String token, HttpServletResponse response) {
		long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));

		response.addHeader("X-Accel-Buffering", "no"); // nginx 관련 설정

		SseEmitter sseEmitter = new SseEmitter(TIME_OUT);
		sseEmitter = sseService.subscribe(userCode, sseEmitter);
		return sseEmitter;
	}

}
