package com.usagi.sorimaeul.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class ProfileImageUpdateRequest {
    private long userCode;
    private String profileImage;
}
