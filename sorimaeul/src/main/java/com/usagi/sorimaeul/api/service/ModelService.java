package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.response.ModelTableCreateResponse;
import org.springframework.http.ResponseEntity;

public interface ModelService {
    ResponseEntity<ModelTableCreateResponse> createModelTable(ModelTableCreateRequest request, long userCode);
}
