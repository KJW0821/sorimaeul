package com.usagi.sorimaeul.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
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
