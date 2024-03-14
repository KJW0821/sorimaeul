package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.ModelInfoDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ModelListResponse {

    private List<ModelInfoDto> voiceModels;
    private boolean end;

}
