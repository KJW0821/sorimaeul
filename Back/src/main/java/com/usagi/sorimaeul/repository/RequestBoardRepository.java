package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.RequestBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestBoardRepository extends JpaRepository<RequestBoard, Integer> {

//    List<RequestBoard> findByUser_userCode(long userCode);

    List<RequestBoard> findByTypeCodeOrderByCreatedTime(int typeCode);
}
