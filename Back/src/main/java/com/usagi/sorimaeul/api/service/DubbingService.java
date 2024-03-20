package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.repository.DubbingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;

@Service
@Transactional
@RequiredArgsConstructor
public interface DubbingService {

    HttpStatus createDub(long userCode, DubCreateRequest dubCreateRequest);

    // private final DubbingRepository dubbingRepository;

}
