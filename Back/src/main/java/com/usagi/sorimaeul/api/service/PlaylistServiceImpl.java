package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.PlaylistCoverInfoDto;
import com.usagi.sorimaeul.dto.dto.PlaylistInfoDto;
import com.usagi.sorimaeul.dto.request.PlaylistCreateRequest;
import com.usagi.sorimaeul.dto.request.PlaylistUpdateRequest;
import com.usagi.sorimaeul.dto.response.PlaylistListResponse;
import com.usagi.sorimaeul.entity.Cover;
import com.usagi.sorimaeul.entity.Playlist;
import com.usagi.sorimaeul.entity.PlaylistCover;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.CoverRepository;
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
    private final CoverRepository coverRepository;

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


    // 플레이리스트 - AI 커버 추가
    public ResponseEntity<?> addPlaylistCover(long userCode, int playlistCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // playlistCode 로 플레이리스트 조회
        Playlist playlist = playlistRepository.findByPlaylistCode(playlistCode);
        // 데이터 없으면 404 반환
        if (playlist == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 플레이리스트 생성자 조회
        User playlistCreator = playlist.getUser();
        // 클라이언트와 플레이리스트 생성자가 일치하지 않으면 400 반환
        if (user != playlistCreator) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // 플레이리스트 코드로 AI 커버들을 조회후 개수 + 1만큼 index 값 정하기
        List<PlaylistCover> playlistCovers = playlistCoverRepository.findByPlaylist_PlaylistCode(playlistCode);
        int coverIndex;
        if (playlistCovers.isEmpty()) {
            coverIndex = 1;
        } else {
            coverIndex = playlistCovers.size() + 1;
        }

        // 플레이리스트에 커버 생성
        PlaylistCover playlistCover = PlaylistCover.builder()
                .playlist(playlistRepository.findByPlaylistCode(playlistCode))
                .cover(coverRepository.findByCoverCode(coverCode))
                .coverIndex(coverIndex)
                .build();
        playlistCoverRepository.save(playlistCover);

        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }


    // 플레이리스트 - AI 커버 삭제
    public ResponseEntity<?> deletePlaylistCover(long userCode, int playlistCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // playlistCode 로 플레이리스트 조회
        Playlist playlist = playlistRepository.findByPlaylistCode(playlistCode);

        // 플레이리스트 생성자 조회
        User playlistCreator = playlist.getUser();

        // 플레이리스트 코드와 커버 코드가 일치하는 값 찾기
        PlaylistCover playlistCover = playlistCoverRepository.findByPlaylist_PlaylistCodeAndCover_CoverCode(playlistCode, coverCode);

        // 데이터 없으면 404 반환
        if (playlistCover == null || playlist == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 클라이언트와 플레이리스트 생성자가 일치하지 않으면 400 반환
        if (user != playlistCreator) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // coverIndex 값 저장해두기
        int coverIndex = playlistCover.getCoverIndex();
        // 커버 삭제
        playlistCoverRepository.delete(playlistCover);
        // 삭제한 데이터의 인덱스보다 인덱스가 큰 커버들을 가져옴
        List<PlaylistCover> playlistCovers = playlistCoverRepository.findByPlaylist_PlaylistCode(playlistCode);
        playlistCovers = playlistCovers.subList(coverIndex, playlistCovers.size());
        // 순회하면서 index 감소 시키기
        for (PlaylistCover cover : playlistCovers) {
            if (cover.getCoverIndex() > coverIndex) {
                cover.setCoverIndex(cover.getCoverIndex() - 1);
            }
        }
        // 바뀐 인덱스 모두 저장
        playlistCoverRepository.saveAll(playlistCovers);

        return ResponseEntity.status(HttpStatus.OK).body(null);

    }


    // 플레이리스트 생성
    public ResponseEntity<?> createPlaylist(long userCode, PlaylistCreateRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // playlist_code = auto_increment, created_time = now()
        Playlist playlist = Playlist.builder()
                .user(user)
                .playlistName(request.getPlaylistName())
                .build();

        playlistRepository.save(playlist);

        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }


    // 플레이리스트 수정
    public ResponseEntity<?> updatePlaylist(long userCode, int playlistCode, PlaylistUpdateRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // playlistCode 로 플레이리스트 조회
        Playlist playlist = playlistRepository.findByPlaylistCode(playlistCode);
        // 플레이리스트 생성자 조회
        User playlistCreator = playlist.getUser();
        // 데이터 없으면 404 반환
        if (playlist == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        // 클라이언트와 플레이리스트 생성자가 일치하지 않으면 400 반환
        } else if (user != playlistCreator) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // 플레이리스트 이름 변경
        playlist.setPlaylistName(request.getPlaylistName());
        // 변동사항 반영
        playlistRepository.save(playlist);

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }


    // 플레이리스트 삭제
    public ResponseEntity<?> deletePlaylist(long userCode, int playlistCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // playlistCode 로 플레이리스트 조회
        Playlist playlist = playlistRepository.findByPlaylistCode(playlistCode);
        // 플레이리스트 생성자 조회
        User playlistCreator = playlist.getUser();
        // 데이터 없으면 404 반환
        if (playlist == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        // 클라이언트와 플레이리스트 생성자가 일치하지 않으면 400 반환
        } else if (user != playlistCreator) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // 삭제
        playlistRepository.delete(playlist);

        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

}
