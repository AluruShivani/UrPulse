package com.example.controller;


import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.BankAccount;
import com.example.entity.MedicalHistory;
import com.example.entity.Pharmacy;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.MedicalHistoryService;


@RestController
@RequestMapping("api/v1")
public class MedicalHistoryController {
	
	@Autowired
	private MedicalHistoryService medicalhistoryService;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	@PostMapping("addMedicalhistory")
	public MedicalHistory createMedicalHistory(@RequestBody MedicalHistory medicalhistory) {
		medicalhistory.setMedicalId(databaseaSequencesGeneratorService.generateSequence(MedicalHistory.SEQUENCE_NAME));
		return medicalhistoryService.createMedicalHistory(medicalhistory);
	}
	
	@GetMapping("getMedicalHistoryById/{medicalId}")
    public Optional<MedicalHistory> getMedicalHistoryById(@PathVariable("medicalId") long medicalId) {
        return medicalhistoryService.getMedicalHistoryById(medicalId);
    }
	
	@GetMapping("/getAllMedicalHistory")
    public List<MedicalHistory> getAllmedicalhistory() {
        return medicalhistoryService.getAllMedicalHistory();
    }
	

    @DeleteMapping("deleteMedicalHistory/{medicalId}")
    public void deleteMedicineHistory(@PathVariable("medicalId") long medicalId) {
    	medicalhistoryService.deleteMedicalHistoryById(medicalId);
    }
    
    @PutMapping(value="/updateMedicalHistory/{medicalId}")
  	public ResponseEntity<Object> updateMedicalHistory(@PathVariable("medicalId")int medicalId,@RequestBody MedicalHistory medicalhistory){
    	MedicalHistory medicalhistory1;
  		boolean flag;
  		if(medicalhistoryService.isMedicalHistoryExits(medicalId)) {
  			flag=medicalhistoryService.updateMedicalHistory(medicalhistory);
  		}else {
  			flag=false;
  		}
  		return new ResponseEntity<>(flag,HttpStatus.OK);
  	}
    
    @GetMapping("/medical-history/{userId}")
    public ResponseEntity<List<MedicalHistory>> getAllMedicalHistoryByUserId(@PathVariable int userId) {
        List<MedicalHistory> medicalHistory = medicalhistoryService.getMedicalHistoryByUserId(userId);
        return new ResponseEntity<>(medicalHistory, HttpStatus.OK);
    }


}
