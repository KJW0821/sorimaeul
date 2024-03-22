package com.usagi.sorimaeul.dto.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CommentInfoDto {

    private String content;
    private String time;

}
