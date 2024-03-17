package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class SseService {

	@Value("${sse.time-out}")
	private final long TIME_OUT;

	private final EmitterRepository emitterRepository;

	public SseEmitter subscribe(long userCode) {
		SseEmitter sseEmitter = new SseEmitter(TIME_OUT);
		sseEmitter = emitterRepository.save(userCode, sseEmitter);

		sseEmitter.onCompletion(() -> emitterRepository.deleteByUserCode(userCode));
		sseEmitter.onTimeout(sseEmitter::complete);
		sseEmitter.onError(sseEmitter::completeWithError);

		sendToClient(userCode, String.valueOf(userCode), "SSE connect OK");

		return sseEmitter;
	}

	public void sendToClient(long userCode, String emitterKey, Object data) {
		SseEmitter sseEmitter = emitterRepository.findByUserCode(userCode);

		if (sseEmitter != null) {
			try {
				log.info("send to client {}:[{}]", emitterKey, data);
				sseEmitter.send(SseEmitter.event()
						.id(String.valueOf(userCode))
						.name(emitterKey)
						.data(data, MediaType.APPLICATION_JSON));
			} catch (IOException e) {
				log.error("failure to send event, id={}, message={}", userCode, e.getMessage());
				emitterRepository.deleteByUserCode(userCode);
			}
		}
	}

	public void disConnect(long userCode) {
		emitterRepository.deleteByUserCode(userCode);
	}

}
