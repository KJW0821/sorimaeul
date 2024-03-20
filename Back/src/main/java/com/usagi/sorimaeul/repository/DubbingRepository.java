package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Dubbing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DubbingRepository extends JpaRepository<Dubbing, Integer> {

//    List<Dubbing> findByUserCode(long userCode);
    // post 시에는 필요 없다?
    // DB에서 찾는 기능이
}
