package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.BlackList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface BlackListRepository extends CrudRepository<BlackList, Long> {

	Optional<BlackList> findByAccessToken(String accessToken);

	Optional<BlackList> findByRefreshToken(String refreshToken);

}
