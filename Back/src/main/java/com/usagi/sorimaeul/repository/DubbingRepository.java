package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Dubbing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DubbingRepository extends JpaRepository<Dubbing, Integer> {

    List<Dubbing> findByUser_userCodeOrderByCreatedTimeDesc(long userCode);

    List<Dubbing> findByUser_userCodeAndDubNameContainingOrderByCreatedTimeDesc(long userCode, String dubName);

    List<Dubbing> findByDubName(String dubName);

    List<Dubbing> findTop5ByVideoSource_videoSourceCodeAndIsCompleteAndIsPublicOrderByLikeCountDesc(int videoSourceCode,  boolean isComplete, boolean isPublic);

    Dubbing findByDubCode(int dubCode);

    List<Dubbing> findByIsComplete(boolean isComplete);

    List<Dubbing> findByIsCompleteAndIsPublicAndVideoSource_videoSourceCodeOrderByCreatedTimeDesc(boolean isComplete, boolean isPublic, int videoSourceCode);

    List<Dubbing> findByDubNameAndIsCompleteAndIsPublic(String dubName, boolean isComplete, boolean isPublic);

}
