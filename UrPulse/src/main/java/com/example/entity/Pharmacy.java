package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection = "pharmacy")
@Data
public class Pharmacy {
    
    @Transient
    public static final String SEQUENCE_NAME = "pharmacy_sequence";
    
    @Id
    private long pharmacyId;
    
    @NotBlank
    private String pharmacyName;
    
    @NotBlank
    @Indexed(unique = true)
    private String shopRegNo;
    
    @NotBlank
    private String location;
    
    @NotBlank
    @Indexed(unique = true)
    private String mobile;
    
    @NotBlank
    private String password;
    
    @NotBlank
    private String pharmacyImage;
}
