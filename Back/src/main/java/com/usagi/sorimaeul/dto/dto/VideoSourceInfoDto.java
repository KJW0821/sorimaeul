package com.usagi.sorimaeul.dto.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoSourceInfoDto {

    private int videoSourceCode;
    private String sourceName;
    private String thumbnailPath;
}
