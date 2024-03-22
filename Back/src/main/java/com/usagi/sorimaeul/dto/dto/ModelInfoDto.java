package com.usagi.sorimaeul.dto.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModelInfoDto {

    private long userCode;
    private int videoSourceCode;
    private int modelCode;
    private String modelName;
    private String imagePath;
    private int recordCount;
    private int state;

}
