package com.usagi.sorimaeul.api.service;

import com.amazonaws.Response;
import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.dto.request.DubbingBoardRequest;
import com.usagi.sorimaeul.dto.request.DubbingRecordConvertRequest;
import com.usagi.sorimaeul.dto.request.DubbingRecordRequest;
import com.usagi.sorimaeul.dto.response.*;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface DubbingService {
    HttpStatus createDub(long userCode, DubCreateRequest dubCreateRequest);

    ResponseEntity<VideoSourceListResponse> getVideoSourceList(long userCode, Integer page, String target);

    ResponseEntity<VideoSourceDetailResponse> getVideoSourceDetail(long userCode, int sourceCode);

    ResponseEntity<Resource> getSourceVideo(long userCode, int videoSourceCode);

    ResponseEntity<DubbingListResponse> getDubbingList(long userCode, String target, String keyword, int page, int videoSourceCode);

    ResponseEntity<DubbingDetailResponse> getDubbingDetail(long userCode, int dubCode);

    ResponseEntity<Resource> getDubbingVideo(long userCode, int dubCode);

    ResponseEntity<?> patchDubbingBoard(long userCode, int dubCode, DubbingBoardRequest request);

    ResponseEntity<?> deleteDubbing(long userCode, int dubCode);

    ResponseEntity<VideoSourceVoiceResponse> getVideoSourceVoice(long userCode, int sourceCode);

    ResponseEntity<?> uploadDubbingRecord(long userCode, int num, DubbingRecordRequest request, MultipartFile recordFile);

//    ResponseEntity<?> convertDubbingRecord(long userCode, int num, DubbingRecordConvertRequest request);
}
