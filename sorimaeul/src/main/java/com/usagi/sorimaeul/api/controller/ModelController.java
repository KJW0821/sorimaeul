package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.ModelService;
import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.response.ModelTableCreateResponse;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/model")
@RequiredArgsConstructor
@Tag(name = "Model 컨트롤러", description = "모델 API")
public class ModelController {

    private final ModelService modelService;
    private final JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "음성 모델 테이블 생성", description = "음성 모델 테이블 생성")
    @ApiResponse(responseCode = "200", description = "음성 모델 테이블 생성 성공")
    @PostMapping
    public ResponseEntity<ModelTableCreateResponse> createModelTable(@RequestHeader("Authorization") String token,
                                                                     @RequestBody ModelTableCreateRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        System.out.println(userCode);
        ResponseEntity<ModelTableCreateResponse> response = modelService.createModelTable(request, userCode);
        System.out.println(response);
        return response;
    }
}
