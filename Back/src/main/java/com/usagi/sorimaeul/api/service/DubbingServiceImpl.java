package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.DubbingInfoDto;
import com.usagi.sorimaeul.dto.dto.VideoSourceInfoDto;
import com.usagi.sorimaeul.dto.dto.VideoSourceVoiceInfoDto;
import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.dto.request.DubbingBoardRequest;
import com.usagi.sorimaeul.dto.request.DubbingRecordConvertRequest;
import com.usagi.sorimaeul.dto.request.DubbingRecordRequest;
import com.usagi.sorimaeul.dto.response.*;
import com.usagi.sorimaeul.entity.*;
import com.usagi.sorimaeul.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.awt.print.Pageable;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DubbingServiceImpl implements DubbingService {

    private final UserRepository userRepository;
    private final DubbingRepository dubbingRepository;
    private final LikeRepository likeRepository;
    private final VideoSourceRepository videoSourceRepository;
    private final VoiceSourceRepository voiceSourceRepository;
    private static final String BASE_PATH = "/home/ubuntu/sorimaeul-data";

    // 원본 영상 목록 조회
    public ResponseEntity<VideoSourceListResponse> getVideoSourceList(long userCode, Integer page, String target){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<VideoSource> videoSources = new ArrayList<>();
        List<VideoSourceInfoDto> customVideoSources = new ArrayList<>();
        // 인덱스 선언
        int startIdx = 0;
        int endIdx = 0;
        // 총 페이지 수 선언
        int totalPages = 1;

        // 인기 영상 조회
        if (target.equals("popular")) {
            videoSources = videoSourceRepository.findTop5VideoSourcesOrderByDubbingCountDesc();

            // Dto 에 담기
            for (VideoSource videoSource : videoSources){
                // Dto 에 담기
                VideoSourceInfoDto videoSourceInfoDto = VideoSourceInfoDto.builder()
                        .videoSourceCode(videoSource.getVideoSourceCode())
                        .sourceName(videoSource.getSourceName())
                        .thumbnailPath(videoSource.getThumbnailPath())
                        .build();
                // customVideoSources 에 담기
                customVideoSources.add(videoSourceInfoDto);
            }
            // Response 생성
            VideoSourceListResponse response = VideoSourceListResponse.builder()
                    .videoSources(customVideoSources)
                    .build();

            return ResponseEntity.ok(response);
        }
        // 전체 영상 조회
        else {
            videoSources = videoSourceRepository.findAllByOrderByCreatedTimeDesc();

            if (page != null) {
                startIdx = (page -   1) * 10;
                endIdx = Math.min(startIdx + 10, videoSources.size());
            }
            else {
                endIdx = videoSources.size();
            }
            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) videoSources.size() / 10);

            // 원본 영상 페이지네이션
            List<VideoSource> pageVideoSources = videoSources.subList(startIdx, endIdx);
            // 원본 영상 리스트 순회
            for (VideoSource videoSource : pageVideoSources){
                // Dto 에 담기
                VideoSourceInfoDto videoSourceInfoDto = VideoSourceInfoDto.builder()
                    .videoSourceCode(videoSource.getVideoSourceCode())
                    .sourceName(videoSource.getSourceName())
                    .thumbnailPath(videoSource.getThumbnailPath())
                    .build();
                // customVideoSources 에 담기
                customVideoSources.add(videoSourceInfoDto);
            }

            // Response 생성
            VideoSourceListResponse videoSourceListResponse = VideoSourceListResponse.builder()
                    .videoSources(customVideoSources)
                    .totalPages(totalPages)
                    .build();

            return ResponseEntity.ok(videoSourceListResponse);
        }
    }

    // 원본 영상 상세 조회
    public ResponseEntity<VideoSourceDetailResponse> getVideoSourceDetail(long userCode, int sourceCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        VideoSource videoSource = videoSourceRepository.findByVideoSourceCode(sourceCode);
        // 리스폰스 생성
        VideoSourceDetailResponse response = VideoSourceDetailResponse.builder()
                .videoSourceCode(sourceCode)
                .sourceName(videoSource.getSourceName())
                .sourceDetail(videoSource.getSourceDetail())
                .videoPlaytime(videoSource.getVideoPlaytime())
                .thumbnailPath(videoSource.getThumbnailPath())
                .createdTime(videoSource.getCreatedTime())
                .build();

        return ResponseEntity.ok(response);
    }

    // 원본 영상 파일 조회
    public ResponseEntity<Resource> getSourceVideo(long userCode, int videoSourceCode){
        VideoSource videoSource = videoSourceRepository.findByVideoSourceCode(videoSourceCode);

        if (videoSource == null) {
            return ResponseEntity.notFound().build();
        }

        String videoPath = videoSource.getStoragePath();
        Resource videoResource = new FileSystemResource(videoPath);
        if (!videoResource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String mimeType = "video/mp4"; // 예시로, 실제 파일 타입에 따라 변경 필요 inline : 재생, attachment : 다운로드
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimeType))
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + videoResource.getFilename() + "\"")
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + videoResource.getFilename() + "\"")
                .body(videoResource);
    }

    // 더빙 영상 목록 조회
    public ResponseEntity<DubbingListResponse> getDubbingList(long userCode, String target, String keyword, int page, int videoSourceCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<Dubbing> dubbings = new ArrayList<>();
        List<DubbingInfoDto> customDubbings = new ArrayList<>();
        // 인덱스 선언
        int startIdx = 0;
        int endIdx = 0;
        // 총 페이지 수 선언
        int totalPages = 0;

        // 모든 게시물 조회 - 더빙 학원에서만 ( 키워드 검색 없음 )
        if (target.equals("all")) {
            dubbings = dubbingRepository.findByIsCompleteAndIsPublicAndVideoSource_videoSourceCodeOrderByCreatedTimeDesc(true, true, videoSourceCode);

            // 한 페이지 당 8개씩 조회
            startIdx = (page - 1) * 8;
            endIdx = Math.min(startIdx + 8, dubbings.size());
            // // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) dubbings.size() / 10);
        }

        // 마이 페이지 - 나의 게시물 조회 ( 키워드 검색 가능 )
         else if (target.equals("mine")) {
            // keyword 가 null 이면 전체 조회
            if (keyword == null){
                dubbings = dubbingRepository.findByUser_userCodeOrderByCreatedTimeDesc(userCode);
            }
            // keyword 가 null 이 아니면 dubName = keyword 를 포함한 데이터 조회
            else {
                dubbings = dubbingRepository.findByUser_userCodeAndDubNameContainingOrderByCreatedTimeDesc(userCode, keyword);
            }

            startIdx = (page - 1) * 6;
            endIdx = Math.min(startIdx + 6, dubbings.size());
            // // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) dubbings.size() / 6);
        }

        // 마이 페이지 - 관심 컨텐츠 - 좋아요 누른 게시물 조회
         else if (target.equals("like")){
            // 나의 유저 코드와 일치하는 like 리스트를 가져온다.
            List<Like> likes  = likeRepository.findByUser_userCode(userCode);
            // like 와 매핑되는 Dubbing 들을 dubbings 에 넣는다.
            for (Like like : likes) {
                Dubbing dubbing = like.getDubbing();
                if (dubbing != null && dubbing.isPublic() && dubbing.isComplete()) {
                    dubbings.add(dubbing);
                }
            }
            // 한 페이지 당 6개 조회
            startIdx = (page - 1) * 6;
            endIdx = Math.min(startIdx + 6, dubbings.size());
            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) dubbings.size() / 6);
        }

        // 인기 더빙 영상 목록 조회
         else if (target.equals("popular")) {
            // 좋아요 수를 기준으로 상위 5개 항목을 가져온다.
//            dubbings = dubbingRepository.findByTop5OrderByLikeCountDESC();
            dubbings = dubbingRepository.findTop5ByVideoSource_videoSourceCodeAndIsCompleteAndIsPublicOrderByLikeCountDesc(true, true, videoSourceCode);
            startIdx = 0;
            endIdx = dubbings.size();
            // // 총 페이지 수 계산
            totalPages = 1;
        }

        // dubbing 리스트 페이지네이션
        List<Dubbing> pageDubbings = dubbings.subList(startIdx, endIdx);
        // dubbing 리스트를 순회
        for (Dubbing dubbing : pageDubbings) {
            // Dto 에 담기
            DubbingInfoDto dubbingInfoDto = DubbingInfoDto.builder()
                    .dubCode(dubbing.getDubCode())
                    .dubName(dubbing.getDubName())
                    .isPublic(dubbing.isPublic())
                    .isComplete(dubbing.isComplete())
                    .thumbnailPath(dubbing.getVideoSource().getThumbnailPath())
                    .likeCount(dubbing.getLikeCount())
                    .nickname(dubbing.getUser().getNickname())
                    .profileImage(dubbing.getUser().getProfileImage())
                    .build();

        // customDubbings에 담기
        customDubbings.add(dubbingInfoDto);
        }
        // 리스폰스 생성
        DubbingListResponse dubbingListResponse = DubbingListResponse.builder()
                .dubbings(customDubbings)
                .totalPages(totalPages)
                .build();

        return ResponseEntity.ok(dubbingListResponse);
    }

    // 더빙 영상 상세 조회
    public ResponseEntity<DubbingDetailResponse> getDubbingDetail(long userCode, int dubCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);
        // 좋아요 여부 확인
        boolean isLiked;
        if (likeRepository.findByUser_userCodeAndDubbing_dubCode(userCode, dubCode) == null) isLiked = false;
        else isLiked = true;
        // response 생성
        DubbingDetailResponse response = DubbingDetailResponse.builder()
                .dubCode(dubCode)
                .dubName(dubbing.getDubName())
                .dubDetail(dubbing.getDubDetail())
                .nickname(dubbing.getUser().getNickname())
                .profileImage(dubbing.getUser().getProfileImage())
                .likeCount(dubbing.getLikeCount())
                .createdTime(dubbing.getCreatedTime())
                .thumbnailPath(dubbing.getVideoSource().getThumbnailPath())
                .isLiked(isLiked)
                .build();

        return ResponseEntity.ok(response);
    }

    // 더빙 영상 파일 조회
    public ResponseEntity<Resource> getDubbingVideo(long userCode, int dubCode){
        Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);

        if (dubbing == null) {
            return ResponseEntity.notFound().build();
        }

        String videoPath = dubbing.getStoragePath();
        Resource videoResource = new FileSystemResource(videoPath);
        if (!videoResource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String mimeType = "video/mp4"; // 예시로, 실제 파일 타입에 따라 변경 필요
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimeType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + videoResource.getFilename() + "\"")
                .body(videoResource);
    }

    // 더빙 영상 등록/수정
    public ResponseEntity<?> patchDubbingBoard(long userCode, int dubCode, DubbingBoardRequest request){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 더빙 영상 수정
        Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);
        dubbing.setDubName(request.getDubName());
        dubbing.setDubDetail(request.getDubDetail());
        dubbing.setVideoSource(videoSourceRepository.findByVideoSourceCode(request.getSourceCode()));
        dubbing.setPublic(request.isPublic());
        dubbingRepository.save(dubbing);
        
        return ResponseEntity.status(HttpStatus.OK).body("수정 성공");
    }

    // 더빙 영상 삭제
    public ResponseEntity<?> deleteDubbing(long userCode, int dubCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        
        // 더빙 삭제
        dubbingRepository.deleteById(dubCode);
        
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제 성공");
    }

    // 더빙 영상 분리된 음성 조회
    public ResponseEntity<VideoSourceVoiceResponse> getVideoSourceVoice(long userCode, int sourceCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 음성 조회
        List<VoiceSource> voiceSources = voiceSourceRepository.findByVideoSource_VideoSourceCodeAndVoiceModelIsNull(sourceCode);
        List<VideoSourceVoiceInfoDto> videoSourceVoiceInfoDtos = new ArrayList<>();
        for (VoiceSource voiceSource : voiceSources){
            // Dto에 담기
            VideoSourceVoiceInfoDto videoSourceVoiceInfoDto = VideoSourceVoiceInfoDto.builder()
                    .videoSourceCode(voiceSource.getVoiceSourceCode())
                    .voicePath(voiceSource.getVoicePath())
                    .build();
            videoSourceVoiceInfoDtos.add(videoSourceVoiceInfoDto);
        }
        // 리스폰스 생성
        VideoSourceVoiceResponse response = VideoSourceVoiceResponse.builder()
                .voiceSources(videoSourceVoiceInfoDtos)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 더빙 음성 녹음 업로드
    public ResponseEntity<?> uploadDubbingRecord(long userCode, int num, DubbingRecordRequest request, MultipartFile recordFile){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 폴더 경로 설정
        String folderPath = BASE_PATH + "/dub/source_" + request.getSourceCode() + "/user_" + user.getUserCode() + "/Unconverted/";

        try {
            // 폴더 생성
            createFolder(folderPath);

            // record_1.wav 형식으로 저장
            String fileName = num + ".wav";
            // 파일 생성
            saveFile(folderPath + fileName, recordFile.getBytes());

            DubbingRecordResponse response =DubbingRecordResponse.builder()
                    .voicePath(folderPath + fileName)
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(response);

            // 서버 오류 처리
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("녹음 파일을 업로드하는 과정에서 오류가 발생했습니다." + e.getMessage());
        }
    }

//     더빙 음성 변환
//    private static final String AI_SERVER_URL = "http://70.12.130.111:7867/rvc/infer/";
//
//    // 더빙 음성 변환과 파일 저장
//    public ResponseEntity<?> convertDubbingRecord(long userCode, int num, DubbingRecordConvertRequest request, MultipartFile recordFile, int pitch, MultipartFile voiceModel) {
//        // 사용자 정보 확인
//        User user = userRepository.getUser(userCode);
//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
//        }
//
//        // 변환된 파일을 저장할 폴더 경로 설정
//        String folderPath = BASE_PATH + "/dub/source_" + request.getSourceCode() + "/user_" + user.getUserCode() + "/converted/";
//        // AI 서버에 요청을 보내기 위한 WebClient 구성
//        WebClient webClient = WebClient.create(AI_SERVER_URL);
//
//        // AI 서버에 요청 보내기
//        return sendRecordToAIServer(userCode, request.getSourceCode(), num, request.getModelCode(), recordFile, pitch, voiceModel, webClient)
//                .map(response -> {
//                    // AI 서버로부터 받은 변환된 파일 저장
//                    String convertedFileName = folderPath + num + ".wav";
//                    try {
//                        saveFile(convertedFileName, response.getVoiceModelConvertedFileBytes());
//                        return ResponseEntity.ok("파일 변환 및 저장이 완료되었습니다.");
//                    } catch (IOException e) {
//                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("변환된 파일 저장 중 오류 발생: " + e.getMessage());
//                    }
//                }).block(); // 비동기 요청의 결과를 동기화하기 위해 block 사용
//    }

        // AI 서버로부터 변환된 파일 받기
        private Mono<DubbingRecordConvertResponse> sendRecordToAIServer(long userCode, int videoSourceCode, int voiceIndex, int modelCode, MultipartFile recordFile, int pitch, MultipartFile voiceModel, WebClient webClient) {
            return webClient.post()
                    .uri(uriBuilder -> uriBuilder.path("/rvc/infer/{userCode}/{videoSourceCode}/{voiceIndex}/{modelCode}/{pitch}")
                            .build(userCode, videoSourceCode, voiceIndex, modelCode, pitch))
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromMultipartData("recordFile", recordFile.getResource())
                            .with("voiceModel", voiceModel.getResource()))
                    .retrieve()
                    .bodyToMono(DubbingRecordConvertResponse.class); // 변환된 파일의 바이트 배열을 포함하는 응답 타입으로 매핑
        }

//         파일 저장 로직 (기존에 정의된 saveFile 메서드 사용 가능)
//    public ResponseEntity<?> convertDubbingRecord(long userCode, int num, DubbingRecordConvertRequest request){
//        // 사용자 정보 확인
//        User user = userRepository.getUser(userCode);
//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }


        // 폴더 경로 설정
//        String folderPath = BASE_PATH + "/dub/source_" + request.getSourceCode() + "/user_" + user.getUserCode() + "/converted/";

//        MultipartFile convertedRecord = getConvertedFile();
        // 파일 경로를 통해 녹음 파일과 피치 모델을 AI 서버에 보내고 받아온다
//        try {
//            // 폴더 생성
//            createFolder(folderPath);
//            // record_1.wav 형식으로 저장
//            String fileName = num + ".wav";
//            // 파일 생성
//            saveFile(folderPath + fileName, recordFile.getBytes());
//
//            VoiceSource voiceSource = new VoiceSource();
//            voiceSource.setVoicePath(folderPath + fileName);
//            voiceSourceRepository.save(voiceSource);
//
//            DubbingRecordConvertResponse response = DubbingRecordConvertResponse.builder()
//                    .voiceSourceCode(voiceSource.getVoiceSourceCode())
//                    .voicePath(folderPath + fileName)
//                    .build();
//
//
//            return ResponseEntity.status(HttpStatus.OK).body(response);
//
//            // 서버 오류 처리
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("녹음 파일을 업로드하는 과정에서 오류가 발생했습니다." + e.getMessage());
//        }
//        return ResponseEntity.ok(response);
//    }
//
//    public Mono<ResponseEntity<?>> sendRecordToAIServer(long userCode, int videoSourceCode, int voiceIndex, int modelCode, MultipartFile recordFile, int pitch, MultipartFile voiceModel) {
//        // 파일을 바이트 배열로 변환합니다. 실제 사용 시 파일 경로에서 파일을 읽어와서 바이트 배열로 변환해야 합니다.
//        byte[] recordFileBytes;
//        byte[] voiceModelBytes;
//        try {
//            recordFileBytes = recordFile.getBytes();
//            voiceModelBytes = voiceModel.getBytes();
//        } catch (IOException e) {
//            return Mono.error(e); // 파일 읽기 실패 시 에러 처리
//        }
//
//        return WebClient.create("http://70.12.130.111:7867")
//                .post()
//                .uri("/rvc/infer/"+userCode+"/"+videoSourceCode+"/"+voiceIndex+"/"+modelCode+"/"+pitch)
//                .contentType(MediaType.MULTIPART_FORM_DATA)
//                .body(BodyInserters.fromMultipartData("recordFile", new ByteArrayResource(recordFileBytes))
//                                .with("voiceModel", new ByteArrayResource(voiceModelBytes))
//                        // 기타 필요한 데이터 추가
//                )
//                .retrieve()
//                .toEntity(String.class); // or toEntity(YourResponseType.class) if you have a specific response type
//    }

//    private MultipartFile getConvertedFile(long userCode, int videoSourceCode, int voiceIndex, int modelCode, MultipartFile recordFile, int pitch, MultipartFile voiceModel){
//        MultipartFile a = voiceModel;
//        return WebClient.create("http://70.12.130.111:7867")
//                .post()
//                .uri("/rvc/infer/"+userCode+"/"+videoSourceCode+"/"+voiceIndex+"/"+modelCode+"/"+pitch)
//                .contentType(MediaType.MULTIPART_FORM_DATA)
//                .body(Mono.just(
//                        org.springframework.http.client.MultipartBodyBuilder()
//                                .part("file", resource)
//                                .build()
//                ), MediaType.MULTIPART_FORM_DATA);
//    }

    public HttpStatus createDub (long userCode, DubCreateRequest request){
        User user = userRepository.getUser(userCode);
        VideoSource videoSource = videoSourceRepository.findByVideoSourceCode(request.getSourceCode());

        Dubbing dubbing = Dubbing.builder()
                .user(user)
                .videoSource(videoSource)
                .dubName(request.getDubName())
                .build();

        dubbingRepository.save(dubbing);

        return HttpStatus.OK;
    }


    // 리스트 뒤집기
    public void reverseList(List<Dubbing> list) {
        int start = 0;
        int end = list.size() - 1;

        while (start < end) {
            // 리스트의 앞과 뒤 요소를 교환
            Dubbing temp = list.get(start);
            list.set(start, list.get(end));
            list.set(end, temp);

            // 다음 요소로 이동
            start++;
            end--;
        }
    }

    // 폴더 생성
    private void createFolder(String folderPath) throws IOException {
        Path path = Paths.get(folderPath);
        if (!Files.exists(path)) Files.createDirectories(path);
    }


    // 파일 저장
    private void saveFile(String filePath, byte[] data) throws IOException {
        Path path = Paths.get(filePath);
        Files.write(path, data);
    }

    public static void changeFolderPermission(String folderPath) {
        try {
            File folder = new File(folderPath);
            if (!folder.exists()) {
                // 폴더가 존재하지 않는 경우에는 먼저 폴더를 생성합니다.
                folder.mkdirs();
            }
            // 폴더의 읽기 및 쓰기 권한을 설정합니다.
            folder.setReadable(true);
            folder.setWritable(true);
            System.out.println("1폴더의 권한 변경 성공");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("2폴더의 권한 변경 실패");
        }
    }

}

