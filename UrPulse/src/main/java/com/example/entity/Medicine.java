package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection = "medicine")
@Data
public class Medicine {
	
	@Transient
    public static final String SEQUENCE_NAME = "medicine_sequence";
	
	@Id
	private long id;
	
	@NotBlank
	@Indexed(unique = true)
	private String medicineName;

}
