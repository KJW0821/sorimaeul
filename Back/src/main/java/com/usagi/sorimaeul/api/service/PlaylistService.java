package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.response.PlaylistListResponse;
import org.springframework.http.ResponseEntity;

public interface PlaylistService {

    ResponseEntity<PlaylistListResponse> getPlaylistList(long userCode);

}
