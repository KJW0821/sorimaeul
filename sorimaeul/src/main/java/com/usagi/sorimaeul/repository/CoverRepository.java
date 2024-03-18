package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Cover;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoverRepository extends JpaRepository<Cover, Integer> {

    List<Cover> findByUser_userCode(long userCode);

    List<Cover> findByCoverName(String coverName);

    List<Cover> findByCoverCode(int coverCode);

}
