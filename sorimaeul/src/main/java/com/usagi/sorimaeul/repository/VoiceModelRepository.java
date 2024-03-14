package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.dto.dto.ModelInfoDto;
import com.usagi.sorimaeul.entity.VoiceModel;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoiceModelRepository extends JpaRepository<VoiceModel, Integer> {

    VoiceModel findByModelCode(int modelCode);
//    VoiceModel findByVideoCode(int videoCode);
//    VoiceModel findByUserCode(long userCode);
@Query(value = "SELECT new com.usagi.sorimaeul.dto.dto.ModelInfoDto(v.modelCode, v.modelName, v.imagePath, v.recordCount, v.state) " +
        "FROM VoiceModel v WHERE v.user.userCode = :userCode OR v.videoSource.videoSourceCode = :videoSourceCode")
    List<ModelInfoDto> getModelList(@Param("userCode") long userCode, @Param("videoSourceCode") int videoSourceCode);

}
