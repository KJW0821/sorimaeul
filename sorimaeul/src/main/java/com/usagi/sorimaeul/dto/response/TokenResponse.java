package com.usagi.sorimaeul.dto.response;

import lombok.Builder;

@Builder
public class TokenResponse {

    private long userCode;
    private String tokenType;
    private String accessToken;
    private String refreshToken;

}
