package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.ResponseS3Dto;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;


public interface S3Service {

    ResponseS3Dto getPresignedUrlToUpload(long userCode, String fileName);

}