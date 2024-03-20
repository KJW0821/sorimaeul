package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.PlaylistCoverInfoDto;
import com.usagi.sorimaeul.dto.dto.PlaylistInfoDto;
import com.usagi.sorimaeul.dto.response.PlaylistListResponse;
import com.usagi.sorimaeul.entity.Cover;
import com.usagi.sorimaeul.entity.Playlist;
import com.usagi.sorimaeul.entity.PlaylistCover;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.PlaylistCoverRepository;
import com.usagi.sorimaeul.repository.PlaylistRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PlaylistServiceImpl implements PlaylistService {

    private final UserRepository userRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaylistCoverRepository playlistCoverRepository;

    // 플레이리스트 전체 조회
    public ResponseEntity<PlaylistListResponse> getPlaylistList(long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 클라이언트 userCode 와 일치하는 Playlist 모두 조회
        List<Playlist> playlists = playlistRepository.findByUser_UserCode(userCode);
        List<PlaylistInfoDto> playlistInfoDtos = new ArrayList<>();
        // 플레이리스트들을 순회하며
        for (Playlist playlist : playlists) {
            // 플레이리스트코드를 이용해서 AI 커버 목록 조회
            int playlistCode = playlist.getPlaylistCode();
            List<PlaylistCover> playlistCovers = playlistCoverRepository.findByPlaylist_PlaylistCode(playlistCode);
            // PlaylistCoverInfoDto 리스트 빈 리스트 생성
            List<PlaylistCoverInfoDto> playlistCoverInfoDtos = new ArrayList<>();
            // AI 커버 목록 순회하며
            for (PlaylistCover playlistCover : playlistCovers) {
                // 커버 불러오기
                Cover cover = playlistCover.getCover();
                // Dto 에 값 넣기
                PlaylistCoverInfoDto playlistCoverInfoDto = PlaylistCoverInfoDto.builder()
                        .coverSinger(cover.getCoverSinger())
                        .singer(cover.getSinger())
                        .title(cover.getTitle())
                        .writer(cover.getUser().getNickname())
                        .storagePath(cover.getStoragePath())
                        .isPublic(cover.isPublic())
                        .build();
                // List 안에 Dto 추가
                playlistCoverInfoDtos.add(playlistCoverInfoDto);
            }
            // playlistInfoDto 생성
            PlaylistInfoDto playlistInfoDto = PlaylistInfoDto.builder()
                    .playlistCode(playlistCode)
                    .playlistName(playlist.getPlaylistName())
                    .createTime(playlist.getCreateTime())
                    .playlist(playlistCoverInfoDtos)
                    .build();
            
            // playlistInfoDtos 리스트에 추가
            playlistInfoDtos.add(playlistInfoDto);
        }
        
        // 리스폰스 생성
        PlaylistListResponse playlistListResponse = PlaylistListResponse.builder()
                .playlists(playlistInfoDtos)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(playlistListResponse);

    }


    // 플레이리스트 상세 조회 - AI 커버 리스트 조회
    public ResponseEntity<PlaylistInfoDto> getPlaylistCoverList(long userCode, int playlistCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // PlaylistCode 로 플레이리스트 조회하기
        List<PlaylistCover> playlistCovers = playlistCoverRepository.findByPlaylist_PlaylistCode(playlistCode);

        // 비어있으면 204 반환
        if (playlistCovers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // PlaylistCoverInfoDto 리스트 빈 리스트 생성
        List<PlaylistCoverInfoDto> playlistCoverInfoDtos = new ArrayList<>();
        // AI 커버 목록 순회하며
        for (PlaylistCover playlistCover : playlistCovers) {
            // 커버 불러오기
            Cover cover = playlistCover.getCover();
            // Dto 에 값 넣기
            PlaylistCoverInfoDto playlistCoverInfoDto = PlaylistCoverInfoDto.builder()
                    .coverSinger(cover.getCoverSinger())
                    .singer(cover.getSinger())
                    .title(cover.getTitle())
                    .writer(cover.getUser().getNickname())
                    .storagePath(cover.getStoragePath())
                    .isPublic(cover.isPublic())
                    .build();
            // List 안에 Dto 추가
            playlistCoverInfoDtos.add(playlistCoverInfoDto);
        }

        // 반환할 Dto 생성
        PlaylistInfoDto playlistInfoDto = PlaylistInfoDto.builder()
                .playlist(playlistCoverInfoDtos)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}
