package com.usagi.sorimaeul.dto.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CoverRequestDto {

    private String youtubeURL;
    private long userCode;
    private int modelCode;
    private int coverCode;
    private String coverName;
    private int pitch;

}
