package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.VideoSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoSourceRepository extends JpaRepository<VideoSource, Integer> {

    VideoSource findByVideoSourceCode(Integer videoSourceCode);
}
