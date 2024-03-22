package com.usagi.sorimaeul.dto.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CommentInfoDto {

    private String nickname;
    private String profileImage;
    private String content;
    private String time;

}
