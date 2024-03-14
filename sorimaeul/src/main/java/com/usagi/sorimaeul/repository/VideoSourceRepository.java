package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.VideoSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoSourceRepository extends JpaRepository<VideoSource, Integer> {
    // 이거 왜 하고 있었지
//    VideoSource getVideoSource(int videoSourceCode);
    VideoSource findByVideoSourceCode(int videoSourceCode);
}
