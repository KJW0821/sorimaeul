package com.usagi.sorimaeul.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoSourceDetailResponse {

    private int videoSourceCode;
    private String sourceName;
    private String storagePath;
    private LocalDateTime createdTime;
    private String thumbnailPath;
    private String videoPlaytime;
    private String sourceDetail;
}
