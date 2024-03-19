package com.usagi.sorimaeul.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SseRequest {

	private long userCode;
	private Object data;

}
