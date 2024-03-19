package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.repository.DubbingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class DubbingService {

    private final DubbingRepository dubbingRepository;
}
