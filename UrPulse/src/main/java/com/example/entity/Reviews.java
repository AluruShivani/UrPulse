package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection = "reviews")
@Data
public class Reviews {
	
	@Transient
    public static final String SEQUENCE_NAME = "reviews_sequence";
	
	@Id
	private long reviewId;
	
	@Field("doctorId")
	private int doctorId;
	
	@Field("userId")
	private int userId;
	
	@NotBlank
	private int rating;
	
	@NotBlank
	private String review;

}
