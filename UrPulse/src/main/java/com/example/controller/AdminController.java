package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Admin;
import com.example.service.AdminService;

@RestController
@RequestMapping("/api/v1")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	 @PostMapping("createAdmin")
	    public Admin createAdmin(@RequestBody Admin admin) {
	        return adminService.createAdmin(admin);
	    }
	 
	 @PostMapping(value = "/adminLogin")
		public ResponseEntity<Object> adminLogin(@RequestBody Admin admin){
			boolean flag = adminService.loginValidate(admin);
			return new ResponseEntity<>(flag,HttpStatus.OK);
		}
	

}
