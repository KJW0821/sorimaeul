package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import org.springframework.http.HttpStatus;

public interface DubbingService {
    HttpStatus createDub(long userCode, DubCreateRequest dubCreateRequest);

}
