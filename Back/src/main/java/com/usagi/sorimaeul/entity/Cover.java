package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cover_tb")
public class Cover {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cover_code")
    private int coverCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_code", referencedColumnName = "user_code")
    private User user;

    @Column(name = "cover_name")
    private String coverName;

    @Column(name = "cover_singer")
    private String coverSinger;

    @Column(name = "singer")
    private String singer;

    @Column(name = "title")
    private String title;

    @Column(name = "cover_detail")
    private String coverDetail;

    @Column(name = "storage_path")
    private String storagePath;

    @Column(name = "is_public")
    private boolean isPublic;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    @Column(name = "thumbnail_path")
    private String thumbnailPath;

    @Column(name = "like_count")
    private int likeCount;

}
