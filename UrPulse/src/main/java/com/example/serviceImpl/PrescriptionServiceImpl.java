package com.example.serviceImpl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.entity.Prescription;
import com.example.repository.PrescriptionRepository;
import com.example.service.PrescriptionService;

@Service
public class PrescriptionServiceImpl implements PrescriptionService{

	@Autowired
    private PrescriptionRepository prescriptionRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(PrescriptionServiceImpl.class);
	
	@Override
	public Prescription createPrescription(Prescription prescription) {
		return prescriptionRepository.save(prescription);
	}

	@Override
	public Optional<Prescription> getPrescriptionById(long prescriptionId) {
		return prescriptionRepository.findById(prescriptionId);
	}

	@Override
	public List<Prescription> getAllPrescriptions() {
		return prescriptionRepository.findAll();
	}

	@Override
	public void deletePrescription(long prescriptionId) {
		prescriptionRepository.deleteById(prescriptionId);
	}
	
	@Override
	public boolean updatePrescription(Prescription prescription) {
		// TODO Auto-generated method stub
		if (isPrescriptionExist(prescription.getPrescriptionId())) {
            prescriptionRepository.save(prescription);
            return true;
        }

		return false;
	}


	@Override
	public boolean isPrescriptionExist(long prescriptionId) {
		// TODO Auto-generated method stub
		return prescriptionRepository.existsById(prescriptionId);
	}

	public List<Prescription> findByAppointmentId(long appointmentId) {
        return prescriptionRepository.findByAppointmentId(appointmentId);
    }

	 @Override
	    public List<Prescription> getPrescriptionsByAppointmentId(long appointmentId) {
	        return prescriptionRepository.findByAppointmentId(appointmentId);
	    }

	 @Override
	 public boolean transferPrescriptions(long pharmacyId, List<String> prescriptions, long appointmentId) {
	     try {
	         logger.info("Received request to transfer prescriptions to pharmacyId: {} for appointmentId: {}", pharmacyId, appointmentId);
	         
	         // Fetch existing prescriptions by appointmentId
	         List<Prescription> existingPrescriptions = prescriptionRepository.findByAppointmentId(appointmentId);
	         
	         for (String prescriptionDetails : prescriptions) {
	             Prescription prescription = existingPrescriptions.stream()
	                 .filter(p -> p.getPrescription().equals(prescriptionDetails))
	                 .findFirst()
	                 .orElse(new Prescription());
	             
	             prescription.setPrescription(prescriptionDetails);
	             prescription.setAppointmentId((int) appointmentId);
	             prescription.setPharmacyId(pharmacyId);
	             prescriptionRepository.save(prescription);
	             
	             logger.info("Transferred prescription: {} to pharmacy: {}", prescriptionDetails, pharmacyId);
	         }
	         return true;
	     } catch (Exception e) {
	         logger.error("Error transferring prescriptions to pharmacy: {}", pharmacyId, e);
	         return false;
	     }
	 }
	 
	 
	 @Override
	    public List<Prescription> getPrescriptionsByPharmacyId(Long pharmacyId) {
	        return prescriptionRepository.findByPharmacyId(pharmacyId);
	    }
	 
	
	
}