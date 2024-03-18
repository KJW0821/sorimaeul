package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.response.NotifyResponse;
import com.usagi.sorimaeul.entity.Notify;
import com.usagi.sorimaeul.repository.NotifyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class NotifyService {

	private final NotifyRepository notifyRepository;

	public NotifyResponse getNotify(long userCode) {
		List<Notify> list = notifyRepository.findAllByUserCode(userCode);
		return NotifyResponse.builder()
				.list(list)
				.build();
	}

}
