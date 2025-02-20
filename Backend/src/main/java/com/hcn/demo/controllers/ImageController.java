package com.hcn.demo.controllers;

import com.hcn.demo.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1/api/images")
public class ImageController {


    private final ImageService imgService;

    public ImageController(ImageService imageService){
        this.imgService = imageService;
    }

    @PostMapping("/upload/single")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,@RequestParam("type") String type) {
        try {
            String imageUrl = imgService.uploadImage(file,type);
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading image: " + e.getMessage());
        }
    }

    @PostMapping("/upload/multiple/{type}")
    public ResponseEntity<List<String>> uploadMultiple(@RequestParam("files") List<MultipartFile> files,
                                                       @PathVariable String type) {
        try {
            List<String> urls = imgService.multipleUpload(files, type);
            return ResponseEntity.ok(urls);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(List.of("File upload failed: " + e.getMessage()));
        }
    }

    @DeleteMapping("/delete/single/{type}")
    public ResponseEntity<?> deleteImage(@RequestParam("publicId") String publicId, @PathVariable String type) {
        try {
            String result = imgService.deleteImage(publicId,type);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error deleting image: " + e.getMessage());
        }
    }
}
