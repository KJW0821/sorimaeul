package com.usagi.sorimaeul.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoverDetailResponse {

    private String coverName;
    private String coverDetail;
    private String storagePath;
    private int likeCount;
    private String thumbnailPath;
    private String nickName;
    private String coverSinger;
    private String singer;
    private String title;
    private boolean isLiked;

}
