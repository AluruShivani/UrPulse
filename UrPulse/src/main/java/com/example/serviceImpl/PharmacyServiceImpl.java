package com.example.serviceImpl;


import com.example.entity.Pharmacy;
import com.example.repository.PharmacyRepository;
import com.example.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PharmacyServiceImpl implements PharmacyService {

    @Autowired
    private PharmacyRepository pharmacyRepository;

    @Override
    public Pharmacy createPharmacy(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    @Override
    public Optional<Pharmacy> getPharmacyById(long pharmacyId) {
        return pharmacyRepository.findById(pharmacyId);
    }

    @Override
    public List<Pharmacy> getAllPharmacies() {
        return pharmacyRepository.findAll();
    }

    @Override
    public void deletePharmacyById(long pharmacyId) {
        pharmacyRepository.deleteById(pharmacyId);
    }

    @Override
    public boolean updatePharmacy(Pharmacy pharmacy) {
        if (pharmacyRepository.existsById(pharmacy.getPharmacyId())) {
            pharmacyRepository.save(pharmacy);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Pharmacy loginValidate(Pharmacy pharmacy) {
    	Pharmacy pharmacy1= pharmacyRepository.findBymobileAndPassword(pharmacy.getMobile(), pharmacy.getPassword());
		System.out.println("what is there in Doctor=" + pharmacy1);
		return pharmacy1;
	}

    @Override
	public boolean isPharmacyExist(long pharmacyId) {
		// TODO Auto-generated method stub
		return pharmacyRepository.existsById(pharmacyId);
	}
}
