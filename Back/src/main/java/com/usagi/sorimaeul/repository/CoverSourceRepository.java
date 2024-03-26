package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.dto.dto.CoverSourceInfoDto;
import com.usagi.sorimaeul.entity.CoverSource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoverSourceRepository extends JpaRepository<CoverSource, Integer> {

}
