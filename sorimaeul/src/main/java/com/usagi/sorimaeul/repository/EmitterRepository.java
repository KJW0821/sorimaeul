package com.usagi.sorimaeul.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.*;
import java.util.concurrent.*;

@Repository
public class EmitterRepository {

	public final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

	// emitter 저장
	public SseEmitter save(long userCode, SseEmitter sseEmitter) {
		emitters.put(userCode, sseEmitter);
		return sseEmitter;
	}

	// 한 유저의 sseEmitter 찾기
	public Optional<SseEmitter> findByUserCode(long userCode) {
		return Optional.ofNullable(emitters.get(userCode));
	}

	// 한 유저의 sseEmitter 삭제
	public void deleteByUserCode(long userCode) {
		emitters.remove(userCode);
	}

}
