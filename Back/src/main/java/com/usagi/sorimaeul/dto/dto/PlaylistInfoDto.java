package com.usagi.sorimaeul.dto.dto;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public class PlaylistInfoDto {

    private String playlistName;
    private LocalDateTime createTime;
    private List<PlaylistCoverInfoDto> playlist;

}
