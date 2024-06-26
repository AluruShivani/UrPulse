package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.example.entity.Medicine;
@Service
public interface MedicinceService {

	Medicine createMedicine(Medicine medicine);
	Optional<Medicine> getMedicineById(long id);
	List<Medicine> getAllMedicines();
	void deleteMedicineById(long id);
	boolean isMedicineExits(long id);
	boolean updateMedicine(Medicine medicine);
	List<Medicine> findMedicinesByName(String medicinceName);
}

