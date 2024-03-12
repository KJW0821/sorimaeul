package com.usagi.sorimaeul.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NicknameUpdateRequest {

    private long userCode;
    private String nickname;

}
