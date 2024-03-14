package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.entity.VideoSource;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VideoSourceListResponse {
    private List<VideoSource> videoSourceList;
    public VideoSourceListResponse(List<VideoSource> videoSourceList) {
        this.videoSourceList = videoSourceList;
    }
}
