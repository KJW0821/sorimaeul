package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.VoiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoiceModelRepository extends JpaRepository<VoiceModel, Integer> {

    VoiceModel findByModelCode(int modelCode);
}
