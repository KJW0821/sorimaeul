package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Dubbing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface DubbingRepository extends JpaRepository<Dubbing, Integer> {

    List<Dubbing> findByUser_userCode(long userCode);

    List<Dubbing> findByDubName(String dubName);

//    List<Dubbing> findByTop5OrderByLikeCountDESC();
    List<Dubbing> findTop5ByOrderByLikeCountDesc();

}
