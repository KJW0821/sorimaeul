package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.CustomUserDetailsDto;
import com.usagi.sorimaeul.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(long userCode) throws UsernameNotFoundException {
        User user = userRepository.getUser(userCode);

        return new CustomUserDetailsDto(user);
    }
}
