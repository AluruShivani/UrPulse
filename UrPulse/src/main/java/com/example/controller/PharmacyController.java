package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.entity.Pharmacy;
import com.example.entity.PrescriptionTransferRequest;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.PharmacyService;
import com.example.service.PrescriptionService;

@RestController
@RequestMapping("api/v1")
public class PharmacyController {
	
	@Autowired
	private PharmacyService pharmacyService;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;

	@Autowired
	private PrescriptionService prescriptionService;
	
	@PostMapping("addPharmacy")
	public Pharmacy createPharmacy(@RequestBody Pharmacy pharmacy) {
		pharmacy.setPharmacyId(databaseaSequencesGeneratorService.generateSequence(Pharmacy.SEQUENCE_NAME));
		return pharmacyService.createPharmacy(pharmacy);
	}
	
	@GetMapping("getPharmacyById/{pharmacyId}")
    public Optional<Pharmacy> getPharmacyById(@PathVariable("pharmacyId") long pharmacyId) {
        return pharmacyService.getPharmacyById(pharmacyId);
    }
	
	@GetMapping("/getAllPharmacies")
    public List<Pharmacy> getAllPharmacies() {
        return pharmacyService.getAllPharmacies();
    }

    @DeleteMapping("deletePharmacy/{pharmacyId}")
    public void deletePharmacy(@PathVariable("pharmacyId") long pharmacyId) {
    	pharmacyService.deletePharmacyById(pharmacyId);
    }
    
    @PutMapping(value="/updatePharmacy/{pharmacyId}")
  	public ResponseEntity<Object> updatePharmacy(@PathVariable("pharmacyId") int pharmacyId, @RequestBody Pharmacy pharmacy) {
  		boolean flag;
  		if (pharmacyService.isPharmacyExist(pharmacyId)) {
  			flag = pharmacyService.updatePharmacy(pharmacy);
  		} else {
  			flag = false;
  		}
  		return new ResponseEntity<>(flag, HttpStatus.OK);
  	}
    
    @PostMapping(value = "/pharmacyLogin")
    public ResponseEntity<Object> pharmacyLogin(@RequestBody Pharmacy pharmacy) {
    	Pharmacy pharmacy1 = pharmacyService.loginValidate(pharmacy);
	    return new ResponseEntity<>(pharmacy1, HttpStatus.OK);
	}

	@PostMapping("/prescriptions/transfer/{pharmacyId}")
	public ResponseEntity<String> transferPrescriptions(@PathVariable("pharmacyId") long pharmacyId, @RequestBody PrescriptionTransferRequest request) {
		boolean success = prescriptionService.transferPrescriptions(pharmacyId, request.getPrescriptions(), request.getAppointmentId());
		if (success) {
			return new ResponseEntity<>("Your prescription is ordered to the pharmacy", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Failed to transfer prescriptions", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
