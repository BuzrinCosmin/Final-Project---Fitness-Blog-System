package com.fitness.fitness.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AdDto {
    private Long id;
    private String name;
    private String type;
    private String content;
    private Double price;
    private MultipartFile image;
    private byte[] returnedImage;
}
