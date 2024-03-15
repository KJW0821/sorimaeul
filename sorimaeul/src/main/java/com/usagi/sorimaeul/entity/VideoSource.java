package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "video_source_tb")
public class VideoSource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_source_code")
    private int videoSourceCode;

    @Column(name = "storage_path")
    private String storagePath;

    @Column(name = "source_name")
    private String sourceName;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "thumbnail_path")
    private String thumbnailPath;
}
