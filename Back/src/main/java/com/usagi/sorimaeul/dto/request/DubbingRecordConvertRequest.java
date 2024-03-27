package com.usagi.sorimaeul.dto.request;

import lombok.Getter;

@Getter
public class DubbingRecordConvertRequest {

    private int sourceCode;
    private int modelCode;
    private String recordPath;
    private int pitch;
}
