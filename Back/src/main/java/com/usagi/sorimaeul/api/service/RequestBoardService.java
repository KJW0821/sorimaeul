package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.response.RequestDetailResponse;
import com.usagi.sorimaeul.dto.response.RequestListResponse;
import org.springframework.http.ResponseEntity;

public interface RequestBoardService {

    ResponseEntity<RequestListResponse> getRequestList(long userCode, int typeCode, int page);

    ResponseEntity<RequestDetailResponse> getRequestDetail(long userCode, int boardCode);
}
