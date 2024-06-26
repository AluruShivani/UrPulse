package com.example.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Admin;
import com.example.entity.Doctor;
@Repository
public interface DoctorRepository extends MongoRepository<Doctor, Long> {
	public Doctor findByMobileAndPassword(String userName, String password);
    List<Doctor> findByDoctorNameContainingIgnoreCaseOrSpecializationContainingIgnoreCaseOrHospitalLocationContainingIgnoreCase(String doctorName, String specialization, String location);

}
