package com.usagi.sorimaeul.api.service;

import java.io.IOException;
import java.util.Date;
import java.util.TimeZone;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import com.usagi.sorimaeul.dto.dto.ResponseS3Dto;
import com.usagi.sorimaeul.api.service.S3Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 파일 업로드를 위한 presignedUrl 요청
    @Override
    public ResponseS3Dto getPresignedUrlToUpload(long userCode, String fileName) {
        // 현재 시간을 기준으로 30분 후의 시간을 얻습니다.
        Date expiration = new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(30));

        // 한국 시간대로 변경합니다.
        TimeZone timeZone = TimeZone.getTimeZone("Asia/Seoul");
        expiration.setTime(expiration.getTime() + timeZone.getRawOffset());

        // 경로 구성
        String filePath = userCode + "/" + fileName;

        GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucket, filePath)
                .withMethod(HttpMethod.PUT)
                .withExpiration(expiration);

        // content-type을 지정합니다.
        generatePresignedUrlRequest.addRequestParameter("Content-Type", "image/jpeg");

        return ResponseS3Dto.builder()
                .url(amazonS3.generatePresignedUrl(generatePresignedUrlRequest).toString())
                .build();
    }



}