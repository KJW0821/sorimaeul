package com.usagi.sorimaeul.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.usagi.sorimaeul.entity.QNotify;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class NotifyRepositoryImpl implements NotifyRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	private final QNotify qnotify = QNotify.notify;

	@Override
	public int checkNotify(int notifyCode) {
		return (int) queryFactory
				.update(qnotify)
				.set(qnotify.isChecked, 1)
				.where(qnotify.notifyCode.eq(notifyCode))
				.execute();
	}

}
