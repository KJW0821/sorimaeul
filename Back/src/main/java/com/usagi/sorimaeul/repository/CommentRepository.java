package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Comment;
import com.usagi.sorimaeul.entity.Dubbing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByCover_CoverCode(int coverCode);

    List<Comment> findByDubbing_DubCode(int dubCode);

    List<Comment> findByCover_CoverCodeAndCommentCode(int coverCode, int commentCode);

    List<Comment> findByDubbing_DubCodeAndCommentCode(int dubCode, int commentCode);

}
