package com.usagi.sorimaeul.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class DubCreateRequest {

    private int sourceCode;

    private String dubName;

    private String[] voicePath;
}
