package com.usagi.sorimaeul.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileUtil {

    // 폴더 생성
    public static void createFolder(String folderPath) throws IOException {
        Path path = Paths.get(folderPath);
        if (!Files.exists(path)) Files.createDirectories(path);
    }


    // 파일 저장
    public static void saveFile(String filePath, byte[] data) throws IOException {
        Path path = Paths.get(filePath);
        Files.write(path, data);
    }
}
