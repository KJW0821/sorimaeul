package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.repository.EmitterRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.*;

@Service
@RequiredArgsConstructor
public class SseService {

	private final EmitterRepository emitterRepository;

	// subscibe 연결 설정
	public SseEmitter subscribe(long userCode, SseEmitter sseEmitter) {
		sseEmitter = emitterRepository.save(userCode, sseEmitter);

		sseEmitter.onCompletion(() -> {
			emitterRepository.deleteByUserCode(userCode);
		});

		sseEmitter.onTimeout(sseEmitter::complete);

		sendConnect(userCode, sseEmitter);

		return sseEmitter;
	}

	// sendMethod
	private void sendConnect(long userCode, SseEmitter sseEmitter) {
		try {
			sseEmitter.send(SseEmitter.event()
					.name("CONNECT")
					.data("connect OK"));
		} catch (IOException e) {
			emitterRepository.deleteByUserCode(userCode);
		}
	}

	public void disConnect(long userCode) {
		emitterRepository.deleteByUserCode(userCode);
	}

}
