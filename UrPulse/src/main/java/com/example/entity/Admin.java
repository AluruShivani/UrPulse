package com.example.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection = "admin")
@Data
public class Admin {
	
	@Transient
    public static final String SEQUENCE_NAME = "admin_sequence";  //this name can be any
					//which we are using in EmployeeController
	
	@Id
	private long id;
	
	@NotBlank
	@Indexed(unique = true)
	private String userName;

	@NotBlank
	private String password;

	
}
