package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.response.ModelListResponse;
import com.usagi.sorimaeul.dto.response.ModelTableCreateResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ModelService {
    ResponseEntity<ModelTableCreateResponse> createModelTable(ModelTableCreateRequest request, long userCode);
    ResponseEntity<String> uploadFile(int modelCode, int num, long userCode, MultipartFile recodingFile);

    ResponseEntity<ModelListResponse> getModelResponse(Integer page, long userCode, Integer videoSourceCode);
}
