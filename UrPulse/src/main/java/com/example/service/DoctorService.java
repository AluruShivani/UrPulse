package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.entity.Admin;
import com.example.entity.Doctor;
@Service
public interface DoctorService {
	
	Doctor createDoctor(Doctor doctor);
	Optional<Doctor> getDoctorById(long doctorId);
	List<Doctor> getAllDoctors();
	void deleteDoctorById(long doctorId);
	boolean isDoctorExits(long doctorId);
	boolean updateDoctor(Doctor doctor);
	 public Doctor loginValidate(Doctor doctor);
	 public List<Doctor> searchDoctors(String query);
 
	
}
