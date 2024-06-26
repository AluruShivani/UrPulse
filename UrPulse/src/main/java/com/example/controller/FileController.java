package com.example.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/files")
public class FileController {

   // private final String uploadDir = "./uploads";
	//String uploadDir="src/main/resources/static/uploads/";

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("filename")String filename) {
        try {
            // Create the upload directory if not exists
        	String uploadDir="src/main/resources/static/uploads/";
            Files.createDirectories(Path.of(uploadDir));

            // Save the file to the upload directory
            Path filePath = Path.of(uploadDir, filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok("File uploaded successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> handleFileDownload(@PathVariable String fileName) throws IOException {
        // Load file as Resource
        Path filePath = Path.of(fileName, fileName);
        Resource resource = new org.springframework.core.io.UrlResource(filePath.toUri());

        // Check if file exists
        if (resource.exists() && resource.isReadable()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } 
        else {
        	return ResponseEntity.notFound().build();
        }
    }
}