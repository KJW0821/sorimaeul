package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {

}
