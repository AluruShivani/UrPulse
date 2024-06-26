package com.example.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Admin;
import com.example.repository.AdminRepository;
import com.example.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	private AdminRepository adminRepository;

	@Override
	public Admin createAdmin(Admin admin) {
		return adminRepository.save(admin);
	}

	@Override
	public boolean loginValidate(Admin admin) {
		Admin admin1 = adminRepository.findByuserNameAndPassword(admin.getUserName(), admin.getPassword());
		if(admin1==null) {
		return false;
		}
		else 
			return true;

}
}
