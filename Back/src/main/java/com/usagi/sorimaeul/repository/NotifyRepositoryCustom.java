package com.usagi.sorimaeul.repository;

public interface NotifyRepositoryCustom {

	int checkNotify(int alertCode);

	int deleteNotify(int notifyCode);

	void insertNotify(long userCode, Object data);

}
