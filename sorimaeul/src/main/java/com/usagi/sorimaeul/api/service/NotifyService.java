package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.repository.NotifyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotifyService {

	private final NotifyRepository notifyRepository;

}
