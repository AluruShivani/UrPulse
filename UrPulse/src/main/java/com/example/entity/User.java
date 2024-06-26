package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection="user")
@Data
public class User {
	
	@Transient
    public static final String SEQUENCE_NAME = "user_sequence";  
	
	@Id
	private long userId;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String gender;
	
	@NotBlank
	@Indexed(unique = true)
	private String email;
	
	@NotBlank
	private String mobile;
	
	@NotBlank
	private String password;
	
	@NotBlank
	private String address;
	
	@NotBlank
	private String emergencyContact;

}
