package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.PlaylistInfoDto;
import lombok.Builder;

import java.util.List;

@Builder
public class PlaylistListResponse {

    private List<PlaylistInfoDto> playlists;

}
