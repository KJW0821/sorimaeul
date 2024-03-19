package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {

	RefreshToken findByUserCode(long userCode);

}
