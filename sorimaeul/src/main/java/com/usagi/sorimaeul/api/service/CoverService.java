package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.CoverInfoDto;
import com.usagi.sorimaeul.dto.response.CoverListResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CoverService {

    ResponseEntity<CoverListResponse> getCoverList(long userCode, String target, String keyword, int page);

}
