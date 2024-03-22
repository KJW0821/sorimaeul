package com.usagi.sorimaeul.dto.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DubbingInfoDto {

    private int dubCode;
    private String dubName;
    private String storagePath;
    private String thumbnailPath;
    private String dubDetail;
    private boolean isPublic;
    private String nickname;
    private String profileImage;
    private int likeCount;
    private LocalDateTime createdTime;
    private int isLiked;

}
