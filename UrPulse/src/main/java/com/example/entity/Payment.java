package com.example.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection = "payment")
@Data
public class Payment {
	
	@Transient
    public static final String SEQUENCE_NAME = "payment_sequence";
	
	@Id
	private long paymentId;
	
	@Field("doctorId")
	private int doctorId;
	
	@Field("userId")
	private int userId;
	
	@NotBlank
	private int amount;
	
	@NotBlank
	private String fromAcc;
	
	@NotBlank
	private String toAcc;
	
	@NotBlank
	@CreatedDate
	private String paymentDate;

}
