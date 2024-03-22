package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
