package com.usagi.sorimaeul.dto.dto;

import lombok.Builder;

import java.util.Map;

@Builder
public class KakaoProfileDto {

    private Map<String, Object> attributes;

    public long getProviderId() {
        return Long.parseLong(String.valueOf(attributes.get("id")));
    }

}
