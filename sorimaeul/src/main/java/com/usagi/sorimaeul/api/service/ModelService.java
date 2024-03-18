package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.request.ModelUpdateRequest;
import com.usagi.sorimaeul.dto.response.ModelInfoResponse;
import com.usagi.sorimaeul.dto.response.ModelListResponse;
import com.usagi.sorimaeul.dto.response.ModelTableCreateResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ModelService {
    ResponseEntity<ModelTableCreateResponse> createModelTable(ModelTableCreateRequest request, long userCode);
    ResponseEntity<String> uploadRecordFile(int modelCode, int num, long userCode, MultipartFile recodingFile);

    ResponseEntity<ModelListResponse> getModelList(Integer page, long userCode, Integer videoSourceCode);

    ResponseEntity<ModelInfoResponse> getModelInfo(int modelCode, long userCode);

    HttpStatus updateModel(int modelCode, long userCode, ModelUpdateRequest request);
}
