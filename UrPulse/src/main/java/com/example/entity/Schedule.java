package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection = "schedule")
@Data
public class Schedule {
	
	@Transient
    public static final String SEQUENCE_NAME = "schedule_sequence";  
	
	@Id
	private long scheduleId;
	
	@Field("doctorId")
	private long doctorId;
	
	@NotBlank
	private String day;
	
	@NotBlank
	private String timings;
	
	@NotBlank
	private String status;

}
