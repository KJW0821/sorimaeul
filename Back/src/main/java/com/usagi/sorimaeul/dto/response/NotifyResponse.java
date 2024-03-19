package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.entity.Notify;
import lombok.Builder;
import lombok.Data;

import java.util.*;

@Data
@Builder
public class NotifyResponse {

	private List<Notify> list;

}
