package com.usagi.sorimaeul.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KakaoProfileDto {

    private Map<String, Object> attributes;

    public long getProviderId() {
        return Long.parseLong(String.valueOf(attributes.get("id")));
    }

}
