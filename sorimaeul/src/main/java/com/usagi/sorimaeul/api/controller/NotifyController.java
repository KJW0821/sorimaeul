package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.NotifyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notify")
@RequiredArgsConstructor
@Tag(name = "Notify 컨트롤러", description = "알림 처리를 위한 컨트롤러")
public class NotifyController {

	private final NotifyService notifyService;

}
