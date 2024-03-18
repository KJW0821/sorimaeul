package com.usagi.sorimaeul.api.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cover")
@RequiredArgsConstructor
@Tag(name = "Cover 컨트롤러", description = "AI 커버 관리를 위한 API")
public class CoverController {
}
