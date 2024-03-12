package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "voice_model_tb")
public class VoiceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_code")
    private int modelCode;

    @Column(name = "user_code")
    private long userCode;

    @Column(name = "video_code")
    private Integer videoCode;

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

    @Column(name = "created_time")
    private LocalDateTime createdTime;

}
