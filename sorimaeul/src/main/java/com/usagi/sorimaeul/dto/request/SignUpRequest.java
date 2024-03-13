package com.usagi.sorimaeul.dto.request;

import jakarta.annotation.Nullable;
import lombok.Getter;

@Getter
public class SignUpRequest {

    private String nickname;

    @Nullable
    private String profileImage;

}
