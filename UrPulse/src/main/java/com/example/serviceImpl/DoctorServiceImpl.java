package com.example.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Admin;
import com.example.entity.Doctor;
import com.example.repository.DoctorRepository;
import com.example.service.DoctorService;
@Service

public class DoctorServiceImpl implements DoctorService{
	@Autowired
	private DoctorRepository doctorRepository;

	@Override
	public Doctor createDoctor(Doctor doctor) {
		return doctorRepository.save(doctor);
	}

	@Override
	public Optional<Doctor> getDoctorById(long doctorId) {
		return doctorRepository.findById(doctorId);
	}

	@Override
	public List<Doctor> getAllDoctors() {
		return doctorRepository.findAll();
	}

	@Override
	public void deleteDoctorById(long doctorId) {
		doctorRepository.deleteById(doctorId);
		
	}

	@Override
	public boolean isDoctorExits(long doctorId) {
		return doctorRepository.existsById(doctorId);
	}

	@Override
	public boolean updateDoctor(Doctor doctor) {
		if(isDoctorExits(doctor.getDoctorId())) {
			doctorRepository.save(doctor);
			return true;
		}
		return false;
	}

	@Override
	public Doctor loginValidate(Doctor doctor) {
		Doctor doctor1= doctorRepository.findByMobileAndPassword(doctor.getMobile(), doctor.getPassword());
		System.out.println("what is there in Doctor=" + doctor1);
		return doctor1;
	}

	public List<Doctor> searchDoctors(String query) {
        List<Doctor> doctors = doctorRepository.findAll();
        return doctors.stream()
                .filter(doctor -> doctor.getDoctorName().toLowerCase().contains(query.toLowerCase())
                        || doctor.getSpecialization().toLowerCase().contains(query.toLowerCase())
                        || doctor.getHospitalLocation().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }


}
