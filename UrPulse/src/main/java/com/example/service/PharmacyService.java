package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.example.entity.Pharmacy;
@Service
public interface PharmacyService {
	 Pharmacy createPharmacy(Pharmacy pharmacy);
	    Optional<Pharmacy> getPharmacyById(long pharmacyId);
	    List<Pharmacy> getAllPharmacies();
	    void deletePharmacyById(long pharmacyId);
	    boolean updatePharmacy(Pharmacy pharmacy);
	    Pharmacy loginValidate(Pharmacy pharmacy);
	    boolean isPharmacyExist(long pharmacyId);
	    

}
