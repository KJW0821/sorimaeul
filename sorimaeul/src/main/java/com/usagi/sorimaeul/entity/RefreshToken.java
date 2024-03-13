package com.usagi.sorimaeul.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 60*60*24*14)
public class RefreshToken {

	private long userCode;

	@Id
	private String refreshToken;

}
