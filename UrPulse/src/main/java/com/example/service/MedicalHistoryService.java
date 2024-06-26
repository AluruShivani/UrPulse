package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.example.entity.MedicalHistory;
@Service
public interface MedicalHistoryService {
	
	MedicalHistory createMedicalHistory(MedicalHistory medicalhistory);
	Optional<MedicalHistory> getMedicalHistoryById(long medicalId);
	List<MedicalHistory> getAllMedicalHistory();
	void deleteMedicalHistoryById(long medicalId);
	boolean isMedicalHistoryExits(long medicalId);
	boolean updateMedicalHistory(MedicalHistory medicalhistory);
	 List<MedicalHistory> getMedicalHistoryByUserId(int userId);

}
