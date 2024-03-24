package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.response.RequestListResponse;
import org.springframework.http.ResponseEntity;

public interface RequestBoardService {

    ResponseEntity<RequestListResponse> getRequestList(long userCode, Integer typeCode, Integer page);
}
