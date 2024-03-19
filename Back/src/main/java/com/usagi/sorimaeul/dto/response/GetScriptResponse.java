package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.ScriptInfoDto;
import lombok.Builder;

import java.util.List;

@Builder
public class GetScriptResponse {

    private List<ScriptInfoDto> scripts;

}
