package com.example.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Medicine;
@Repository
public interface MedicinceRepository extends MongoRepository<Medicine, Long>{

	 List<Medicine> findByMedicineNameContainingIgnoreCase(String name);
}
