package com.usagi.sorimaeul.dto.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoSourceVoiceInfoDto {

    private int videoSourceCode;
    private String voicePath;
}
