package com.usagi.sorimaeul.dto.dto;

import lombok.Builder;

@Builder
public class PlaylistCoverInfoDto {

    private String coverSinger;
    private String singer;
    private String title;
    private String writer;
    private String storagePath;
    private boolean isPublic;

}
