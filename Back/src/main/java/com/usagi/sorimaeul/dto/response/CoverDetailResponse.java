package com.usagi.sorimaeul.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoverDetailResponse {

    private int coverCode;
    private String coverName;
    private String storagePath;
    private String thumbnailPath;
    private boolean isLiked;

}
