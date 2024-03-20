package com.usagi.sorimaeul.api.controller;

import java.io.IOException;

import com.usagi.sorimaeul.api.service.S3Service;
import com.usagi.sorimaeul.dto.dto.ResponseS3Dto;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/images")
public class S3Controller {

    private final S3Service s3Service;
    private final JwtTokenProvider jwtTokenProvider;

    // presigned url 요청 api
    @GetMapping("/presigned/upload")
    public ResponseS3Dto  getPresignedUrlToUpload(@RequestParam(value = "filename") String fileName, @RequestHeader("Authorization") String token) throws IOException {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return s3Service.getPresignedUrlToUpload(userCode, fileName);
    }

}