package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Cover;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoverRepository extends JpaRepository<Cover, Integer> {

    List<Cover> findByUser_userCode(long userCode);

//    List<Cover> findByUser_userCodeAndIsComplete(long userCode, boolean isComplete);
//
//    List<Cover> findByCoverName(String coverName);

    Cover findByCoverCode(int coverCode);

    List<Cover> findTop5ByOrderByLikeCountDescUpdatedTimeDesc();

    List<Cover> findByIsCompleteAndIsPublic(boolean isComplete, boolean isPublic);

    List<Cover> findByCoverNameAndIsComplete(String coverName, boolean isComplete);

}
