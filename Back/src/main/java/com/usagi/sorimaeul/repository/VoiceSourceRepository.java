package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.VoiceSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoiceSourceRepository extends JpaRepository<VoiceSource, Integer> {
}
