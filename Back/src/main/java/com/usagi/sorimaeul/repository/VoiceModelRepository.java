package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.dto.dto.ModelInfoDto;
import com.usagi.sorimaeul.entity.VoiceModel;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoiceModelRepository extends JpaRepository<VoiceModel, Integer>, VoiceModelRepositoryCustom {

    VoiceModel findByModelCode(int modelCode);

}
