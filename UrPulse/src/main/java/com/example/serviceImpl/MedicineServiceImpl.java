package com.example.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Medicine;
import com.example.repository.MedicinceRepository;
import com.example.service.MedicinceService;
@Service
public class MedicineServiceImpl implements MedicinceService {
	@Autowired
	private MedicinceRepository medicineRepository;

	@Override
	public Medicine createMedicine(Medicine medicine) {
		return medicineRepository.save(medicine);
	}

	

	@Override
	public List<Medicine> getAllMedicines() {
		return medicineRepository.findAll();
	}



	@Override
	public Optional<Medicine> getMedicineById(long id) {
		// TODO Auto-generated method stub
		return medicineRepository.findById(id);
	}



	@Override
	public void deleteMedicineById(long id) {
		medicineRepository.deleteById(id);
		
	}



	@Override
	public boolean isMedicineExits(long id) {
		return medicineRepository.existsById(id);
	}



	@Override
	public boolean updateMedicine(Medicine medicine) {
		if(isMedicineExits(medicine.getId())) {
			medicineRepository.save(medicine);
			return true;
		}
		return false;


	}
	
	 public List<Medicine> findMedicinesByName(String name) {
	        return medicineRepository.findByMedicineNameContainingIgnoreCase(name);
	    }
	

	
	
	

}
