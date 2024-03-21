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
    private String storagePath;
    private String dubDetail;
    private LocalDateTime createdTime;
    private String thumbnailPath;
    private boolean isLiked;

}
