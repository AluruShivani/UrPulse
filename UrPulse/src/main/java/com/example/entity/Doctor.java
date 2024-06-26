package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection="doctor")
@Data
public class Doctor {
	
	@Transient
    public static final String SEQUENCE_NAME = "doctor_sequence";  
				
	
	@Id
	
	private long doctorId;
	
	@NotBlank
	private String doctorName;
	
	@NotBlank
	private String gender;
	
	@NotBlank
	private String mobile;
	
	@NotBlank
	@Indexed(unique = true)
	private String email;
	
	@NotBlank
	private String password;
	
	@NotBlank
	private String specialization;
	
	@NotBlank
	private String experience;
	
	@NotBlank
	private String certificate;
	
	@NotBlank
	private String doctorPic;
	
	@NotBlank
	private String hospitalName;
	
	@NotBlank
	private String hospitalLocation;
	
	@NotBlank
	private int consultationFee;
	
	@NotBlank
	private String drAcc;
	
	@NotBlank
	private String status;
	
	
	
	

}
