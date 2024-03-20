package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.repository.DubbingRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

public interface DubbingService {

    HttpStatus createDub(long userCode, DubCreateRequest dubCreateRequest);

//    private final DubbingRepository dubbingRepository;

}
