package com.example.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Admin;
import com.example.entity.Doctor;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.DoctorService;

@RestController
@RequestMapping("api/v1")
public class DoctorController {
	@Autowired
	private DoctorService doctorservice;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
		
	@PostMapping("addDoctor")
	public Doctor createDoctor(@RequestBody Doctor doctor) {
		doctor.setDoctorId(databaseaSequencesGeneratorService.generateSequence(Doctor.SEQUENCE_NAME));
		return doctorservice.createDoctor(doctor);
	}
	
	@GetMapping("getDoctorById/{doctorId}")
    public Optional<Doctor> getDoctorById(@PathVariable("doctorId") long doctorId) {
        return doctorservice.getDoctorById(doctorId);
    }
	
	@GetMapping("/getAllDoctors")
    public List<Doctor> getAllDoctors() {
        return doctorservice.getAllDoctors();
    }

    @DeleteMapping("deleteDoctor/{doctorId}")
    public void deleteDoctor(@PathVariable("doctorId") long doctorId) {
    	doctorservice.deleteDoctorById(doctorId);
    }
    
    @PutMapping(value="/updateDoctors/{doctorId}")
	public ResponseEntity<Object> updateDoctor(@PathVariable("doctorId")int doctorId,@RequestBody Doctor doctor){
		Doctor doctor1;
		boolean flag;
		if(doctorservice.isDoctorExits(doctorId)) {
			flag=doctorservice.updateDoctor(doctor);
		}else {
			flag=false;
		}
		return new ResponseEntity<>(flag,HttpStatus.OK);
	}
    

	@PostMapping(value="/doctorLogin")
	public ResponseEntity<Object> doctorLogin(@RequestBody Doctor doctor){
	    Doctor doctor1 = doctorservice.loginValidate(doctor);
	    return new ResponseEntity<>(doctor1, HttpStatus.OK);
	}
	
	
	
	 @GetMapping("/searchDoctors")
	    public ResponseEntity<List<Doctor>> searchDoctors(@RequestParam String query) {
	        List<Doctor> doctors = doctorservice.searchDoctors(query);
	        return new ResponseEntity<>(doctors, HttpStatus.OK);
	    }

	

}
