package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Cover;
import com.usagi.sorimaeul.entity.Dubbing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;

public interface DubbingRepository extends JpaRepository<Dubbing, Integer> {

    List<Dubbing> findByUser_userCode(long userCode);

//    List<Dubbing> findByUser_userCodeAndIsComplete(long userCode, int isComplete);

    List<Dubbing> findByDubName(String dubName);

    List<Dubbing> findTop5ByOrderByLikeCountDesc();

    Dubbing findByDubCode(int dubCode);

    List<Dubbing> findByIsComplete(boolean isComplete);

    List<Dubbing> findByDubNameAndIsComplete(String dubName, boolean isComplete);

}
