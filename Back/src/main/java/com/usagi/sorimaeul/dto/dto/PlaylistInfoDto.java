package com.usagi.sorimaeul.dto.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
public class PlaylistInfoDto {

    private int playlistCode;
    private String playlistName;
    private LocalDateTime createTime;

}
