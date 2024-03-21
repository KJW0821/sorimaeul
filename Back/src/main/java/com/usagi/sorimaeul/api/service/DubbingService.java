package com.usagi.sorimaeul.api.service;

import com.amazonaws.Response;
import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.dto.response.DubbingDetailResponse;
import com.usagi.sorimaeul.dto.response.DubbingListResponse;
import com.usagi.sorimaeul.dto.response.VideoSourceListResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface DubbingService {
    HttpStatus createDub(long userCode, DubCreateRequest dubCreateRequest);

    ResponseEntity<VideoSourceListResponse> getVideoSourceList(long userCode, int page);

    ResponseEntity<DubbingListResponse> getDubbingList(long userCode, String target, String keyword, int page);

    ResponseEntity<DubbingDetailResponse> getDubbingDetail(long userCode, int dubCode);
}
