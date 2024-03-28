package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Cover;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoverRepository extends JpaRepository<Cover, Integer> {

    List<Cover> findByUser_userCode(long userCode);

    Cover findByCoverCode(int coverCode);

    List<Cover> findTop5ByIsCompleteAndIsPublicOrderByLikeCountDescCoverCodeDesc(boolean isComplete, boolean isPublic);

    List<Cover> findByIsCompleteAndIsPublic(boolean isComplete, boolean isPublic);

    List<Cover> findByCoverNameContainingAndIsCompleteAndIsPublic(String coverName, boolean isComplete, boolean isPublic);

    List<Cover> findByCoverNameContainingAndUser_UserCode(String coverName, long userCode);
}
