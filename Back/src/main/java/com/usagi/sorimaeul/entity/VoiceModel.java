package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "voice_model_tb")
public class VoiceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_code")
    private int modelCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_code", referencedColumnName = "user_code")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_source_code", referencedColumnName = "video_source_code")
    private VideoSource videoSource;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "storage_path")
    private String storagePath;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "state")
    private int state;

    @Column(name = "record_count")
    private Integer recordCount;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

}
