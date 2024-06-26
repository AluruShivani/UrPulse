package com.example.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

import com.example.entity.Prescription;
@Repository
public interface PrescriptionRepository extends MongoRepository<Prescription, Long> {
	 List<Prescription> findByAppointmentId(long appointmentId);
	 List<Prescription> findByPharmacyId(Long pharmacyId);
}
