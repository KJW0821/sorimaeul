package com.usagi.sorimaeul.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_tb")
public class User {

    @Id
    @Column(name = "user_code")
    private long userCode;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "social_type")
    private String socialType;

    @Column(name = "join_date")
    private LocalDateTime joinDate;

    @Column(name = "learn_count")
    private int learnCount;
}
