package com.example.service;

import java.util.List;
import java.util.Optional;


import com.example.entity.Prescription;



public interface PrescriptionService {
	Prescription createPrescription(Prescription prescription);
	Optional<Prescription> getPrescriptionById(long prescriptionId);
	List<Prescription> getAllPrescriptions();
	void deletePrescription(long prescriptionId);
	boolean updatePrescription(Prescription prescription);
    boolean isPrescriptionExist(long prescriptionId);
  
	List<Prescription> findByAppointmentId(long appointmentId);
	
	List<Prescription> getPrescriptionsByAppointmentId(long appointmentId);
    boolean transferPrescriptions(long pharmacyId, List<String> prescriptions, long appointmentId);
    
    List<Prescription> getPrescriptionsByPharmacyId(Long pharmacyId);
}


