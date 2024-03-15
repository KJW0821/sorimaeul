package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Dubbing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DubbingRepository extends JpaRepository<Dubbing, Integer> {

//    List<Dubbing> findByUserCode(long userCode);
}
