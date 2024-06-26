package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection = "banckaccount")
@Data
public class BankAccount {
	
	@Transient
    public static final String SEQUENCE_NAME = "bankaccount_sequence";
	
	@Id
	private long id;
	
	@Field("userId")
	private long userId;
	
	@NotBlank
	@Indexed(unique = true)
	private String accNo;
	
	@NotBlank
	private int balAmount;
	
	@NotBlank
	private String cardNo;
	
	@NotBlank
	private String cardType;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private int cvvNo;
	
	@NotBlank
	private String expiryDate;

}
