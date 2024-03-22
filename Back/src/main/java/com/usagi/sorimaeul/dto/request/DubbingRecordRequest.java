package com.usagi.sorimaeul.dto.request;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class DubbingRecordRequest {
    private int sourceCode;
    private MultipartFile recordFile;
}
