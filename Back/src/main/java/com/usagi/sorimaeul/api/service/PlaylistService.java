package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.PlaylistInfoDto;
import com.usagi.sorimaeul.dto.response.PlaylistListResponse;
import org.springframework.http.ResponseEntity;

public interface PlaylistService {

    ResponseEntity<PlaylistListResponse> getPlaylistList(long userCode);

    ResponseEntity<PlaylistInfoDto> getPlaylistCoverList(long userCode, int playlistCode);

}
