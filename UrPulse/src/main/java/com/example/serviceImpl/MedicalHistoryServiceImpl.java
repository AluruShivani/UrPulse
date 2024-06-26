package com.example.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.MedicalHistory;
import com.example.repository.MedicalHistoryRepository;
import com.example.service.MedicalHistoryService;

@Service
public class MedicalHistoryServiceImpl implements MedicalHistoryService{
	
	@Autowired
	private MedicalHistoryRepository medicalhistoryRepository;

	@Override
	public MedicalHistory createMedicalHistory(MedicalHistory medicalhistory) {
		return medicalhistoryRepository.save(medicalhistory);
	}

	@Override
	public Optional<MedicalHistory> getMedicalHistoryById(long medicalId) {
		return medicalhistoryRepository.findById(medicalId);
	}

	@Override
	public List<MedicalHistory> getAllMedicalHistory() {
		return medicalhistoryRepository.findAll();
	}

	@Override
	public void deleteMedicalHistoryById(long medicalId) {
		medicalhistoryRepository.deleteById(medicalId);
		
	}

	@Override
	public boolean isMedicalHistoryExits(long medicalId) {
		return medicalhistoryRepository.existsById(medicalId);
	}

	@Override
	public boolean updateMedicalHistory(MedicalHistory medicalhistory) {
		if(isMedicalHistoryExits(medicalhistory.getMedicalId())) {
			medicalhistoryRepository.save(medicalhistory);
			return true;
		}
		return false;
	}

	@Override
	public List<MedicalHistory> getMedicalHistoryByUserId(int userId) {
		return medicalhistoryRepository.findByUserId(userId);
	}

	
	
	

}
