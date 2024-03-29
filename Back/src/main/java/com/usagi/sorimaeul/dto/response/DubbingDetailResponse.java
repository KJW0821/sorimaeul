package com.usagi.sorimaeul.dto.response;

import io.netty.handler.codec.socks.SocksRequestType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DubbingDetailResponse {

    private int dubCode;
    private String dubName;
    private String dubDetail;
    private String nickname;
    private String profileImage;
    private int likeCount;
    private LocalDateTime createdTime;
    private String storagePath;
    private String thumbnailPath;
    private boolean isLiked;
    private boolean isComplete;

}
