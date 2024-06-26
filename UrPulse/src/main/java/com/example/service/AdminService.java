package com.example.service;

import org.springframework.stereotype.Service;

import com.example.entity.Admin;

@Service
public interface AdminService {
	
	Admin createAdmin(Admin admin);
	boolean loginValidate(Admin admin);

}
