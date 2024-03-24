package com.usagi.sorimaeul.api.service;

import com.amazonaws.Response;
import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.dto.request.DubbingBoardRequest;
import com.usagi.sorimaeul.dto.request.DubbingRecordRequest;
import com.usagi.sorimaeul.dto.response.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface DubbingService {
    HttpStatus createDub(long userCode, DubCreateRequest dubCreateRequest);

    ResponseEntity<VideoSourceListResponse> getVideoSourceList(long userCode, int page);

    ResponseEntity<VideoSourceDetailResponse> getVideoSourceDetail(long userCode, int sourceCode);

    ResponseEntity<DubbingListResponse> getDubbingList(long userCode, String target, String keyword, int page);

    ResponseEntity<DubbingDetailResponse> getDubbingDetail(long userCode, int dubCode);

    ResponseEntity<?> patchDubbingBoard(long userCode, int dubCode, DubbingBoardRequest request);

    ResponseEntity<?> deleteDubbing(long userCode, int dubCode);

    ResponseEntity<VideoSourceVoiceResponse> getVideoSourceVoice(long userCode, int sourceCode);

    ResponseEntity<DubbingRecordResponse> uploadDubbingRecord(long userCode, DubbingRecordRequest request);
}
