package com.usagi.sorimaeul.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModelInfoResponse {

    private int modelCode;
    private String modelName;
    private String storagePath;
    private String imagePath;
    private int recordCount;
    private int state;

}
