package com.usagi.sorimaeul.dto.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ModelInfoDto {

    private int modelCode;
    private String modelName;
    private String imagePath;
    private int recordCount;
    private int state;

}
