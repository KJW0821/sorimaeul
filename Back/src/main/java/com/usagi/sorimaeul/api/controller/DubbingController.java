package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.DubbingService;
import com.usagi.sorimaeul.api.service.UserService;
import com.usagi.sorimaeul.dto.request.DubCreateRequest;
import com.usagi.sorimaeul.dto.request.DubbingBoardRequest;
import com.usagi.sorimaeul.dto.request.DubbingRecordConvertRequest;
import com.usagi.sorimaeul.dto.request.DubbingRecordRequest;
import com.usagi.sorimaeul.dto.response.*;
import com.usagi.sorimaeul.entity.Dubbing;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.Token;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dub")
@Tag(name = "Dub 컨트롤러", description = "더빙학원 기능을 위한 API")
public class DubbingController {

    private final JwtTokenProvider jwtTokenProvider;
    private final DubbingService dubbingService;

    @PostMapping("/create")
    public ResponseEntity<Void> createDub(DubCreateRequest dubCreateRequest, @RequestHeader("Authorization") String token){
        // API 요청 시 헤더 중 Authorization 키에 담긴 값을 받아옴
        // 유저 코드 받아오기
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));

        HttpStatus status = dubbingService.createDub(userCode, dubCreateRequest);

        return ResponseEntity.status(status).build();
    }

    @Operation(summary = "더빙 원본 영상 목록 조회", description = "더빙 원본 영상 목록 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 원본 영상 목록 조회 성공")
    @GetMapping("/video")
    public ResponseEntity<VideoSourceListResponse> getVideoSourceList(@RequestHeader("Authorization") String token,
                                                                      @RequestParam(required = false) Integer page,
                                                                      @RequestParam(required = false) String target
                                                                      ){
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getVideoSourceList(userCode, page, target);
    }

    @Operation(summary = "더빙 원본 영상 상세 조회", description = "더빙 원본 영상을 상세 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 원본 영상 상세 조회 성공")
    @GetMapping("/video/{sourceCode}")
    public ResponseEntity<VideoSourceDetailResponse> getVideoSourceDetail(@RequestHeader("Authorization") String token,
                                                                          @PathVariable int sourceCode){
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getVideoSourceDetail(userCode, sourceCode);
    }

    @Operation(summary = "더빙 원본 영상 파일 조회", description = "더빙 원본 영상 파일을 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 원본 영상 파일 조회 성공")
    @GetMapping("/file/{videoSourceCode}")
    public ResponseEntity<Resource> getSourceVideo(@RequestHeader("Authorization") String token,
                                                    @PathVariable int videoSourceCode) {

        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getSourceVideo(userCode, videoSourceCode);
    }

    @Operation(summary = "더빙 영상 목록 조회", description = "더빙 영상 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 영상 목록 조회 성공")
    @GetMapping
    public ResponseEntity<DubbingListResponse> getDubbingList(@RequestHeader("Authorization") String token,
                                                              @RequestParam String target,
                                                              @RequestParam(required = false) String keyword,
                                                              @RequestParam(required = false) int page,
                                                              @RequestParam(required = true) int videoSourceCode
                                                              ) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getDubbingList(userCode, target, keyword, page, videoSourceCode);
    }

    @Operation(summary = "더빙 영상 상세 조회", description = "더빙 영상을 상세 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 영상 상세 조회 성공")
    @GetMapping("/{dubCode}")
    public ResponseEntity<DubbingDetailResponse> getDubbingDetail(@RequestHeader("Authorization") String token,
                                                                  @PathVariable int dubCode){
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getDubbingDetail(userCode, dubCode);
    }

    @Operation(summary = "더빙 영상 파일 조회", description = "더빙 영상 파일을 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 영상 파일 조회 성공")
    @GetMapping("/file/{dubCode}")
    public ResponseEntity<Resource> getDubbingVideo(@RequestHeader("Authorization") String token,
                                                    @PathVariable int dubCode) {

        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getDubbingVideo(userCode, dubCode);
    }
    
    @Operation(summary = "더빙 영상 게시글 등록/수정", description = "더빙 영상 게시글을 등록하거나 수정한다.")
    @ApiResponse(responseCode = "200", description = "더빙 영상 등록/수정 성공")
    @PatchMapping("/{dubCode}")
    public ResponseEntity<?> patchDubbingBoard(@RequestHeader("Authorization") String token,
                                               @PathVariable int dubCode,
                                               @RequestBody DubbingBoardRequest request){
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.patchDubbingBoard(userCode, dubCode, request);
    }

    @Operation(summary = "더빙 영상 삭제", description = "더빙 영상을 삭제한다.")
    @ApiResponse(responseCode = "204", description = "더빙 영상 삭제 성공")
    @DeleteMapping("/{dubCode}")
    public ResponseEntity<?> deleteDubbing(@RequestHeader("Authorization") String token,
                                               @PathVariable int dubCode){
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.deleteDubbing(userCode, dubCode);
    }

    @Operation(summary = "더빙 영상 분리된 음성 조회", description = "더빙 영상 분리된 음성을 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 영상 분리된 음성 조회 성공")
    @GetMapping("/audio/{sourceCode}")
    public ResponseEntity<VideoSourceVoiceResponse> getVideoSourceVoice(@RequestHeader("Authorization") String token,
                                                                        @PathVariable int sourceCode){
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getVideoSourceVoice(userCode, sourceCode);
    }

    @Operation(summary = "더빙 영상 녹음 업로드", description = "더빙 영상 녹음을 업로드한다.")
    @ApiResponse(responseCode = "200", description = "더빙 영상 녹음 업로드 성공")
    @PostMapping("/record/{num}")
    public ResponseEntity<?> uploadDubbingRecord(@RequestHeader("Authorization") String token,
                                                                     @PathVariable int num,
                                                                     @RequestBody DubbingRecordRequest request,
                                                 @RequestParam("file") MultipartFile recordFile){
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.uploadDubbingRecord(userCode, num, request, recordFile);
    }

//    @Operation(summary = "더빙 음성 변환", description = "더빙 음성을 변환한다.")
//    @ApiResponse(responseCode = "200", description = "더빙 음성 변환 성공")
//    @PostMapping("/convert/{num}")
//    public ResponseEntity<?> convertDubbingRecord(@RequestHeader("Authorization") String token,
//                                                 @PathVariable int num,
//                                                 @RequestBody DubbingRecordConvertRequest request){
//        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
//        return dubbingService.convertDubbingRecord(userCode, num, request);
//    }
}
