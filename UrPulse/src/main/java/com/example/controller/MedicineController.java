package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.entity.Medicine;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.MedicinceService;


@RestController
@RequestMapping("api/v1")
public class MedicineController {

    @Autowired
    private MedicinceService medicineService;

    @Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;

    @PostMapping("addMedicine")
    public Medicine createMedicine(@RequestBody Medicine medicine) {
        medicine.setId(databaseaSequencesGeneratorService.generateSequence(Medicine.SEQUENCE_NAME));
        return medicineService.createMedicine(medicine);
    }

    @GetMapping("getMedicineById/{id}")
    public Optional<Medicine> getMedicineById(@PathVariable("id") long id) {
        return medicineService.getMedicineById(id);
    }

    @GetMapping("/getAllMedicines")
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    @DeleteMapping("deleteMedicine/{id}")
    public void deleteMedicine(@PathVariable("id") long id) {
        medicineService.deleteMedicineById(id);
    }

    @PutMapping(value="/updateMedicine/{id}")
    public ResponseEntity<Object> updateMedicine(@PathVariable("id") long id, @RequestBody Medicine medicine) {
        boolean flag = medicineService.isMedicineExits(id) && medicineService.updateMedicine(medicine);
        return new ResponseEntity<>(flag, HttpStatus.OK);
    }
    
    @GetMapping("/medicines")
    public ResponseEntity<List<Medicine>> getMedicines(@RequestParam String query) {
        List<Medicine> medicines = medicineService.findMedicinesByName(query);
        return new ResponseEntity<>(medicines, HttpStatus.OK);
    }
}
