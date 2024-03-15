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

    // 기본 모델 가져오기
//    @Query(value = "SELECT new com.usagi.sorimaeul.dto.dto.ModelInfoDto(v.modelCode, v.modelName, v.imagePath, v.recordCount, v.state) " +
//            "FROM VoiceModel v WHERE v.state = 3 AND v.user.userCode = NULL AND v.videoSource.videoSourceCode = NULL")
//    List<ModelInfoDto> getCommonModelList();

}
