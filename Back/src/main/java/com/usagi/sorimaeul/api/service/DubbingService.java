package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.dto.response.VideoSourceListResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface DubbingService {
    HttpStatus createDub(long userCode, DubCreateRequest dubCreateRequest);

    ResponseEntity<VideoSourceListResponse> getVideoSourceList(long userCode, int page);

}
