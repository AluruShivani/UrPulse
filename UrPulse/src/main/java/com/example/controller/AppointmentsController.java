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

import com.example.entity.Appointments;
import com.example.service.AppointmentsService;
import com.example.service.DatabaseaSequencesGeneratorService;

@RestController
@RequestMapping("api/v1")
public class AppointmentsController {
	@Autowired
	private AppointmentsService appointmentsService;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	@PostMapping("addAppointment")
	public Appointments createAppointment(@RequestBody Appointments appointments) {
		appointments.setAppointmentId(databaseaSequencesGeneratorService.generateSequence(Appointments.SEQUENCE_NAME));
		return appointmentsService.createAppointment(appointments);
	}
	
	@GetMapping("getAppointmentById/{appointmentId}")
    public Optional<Appointments> getAppointmentById(@PathVariable("appointmentId") long appointmentId) {
        return appointmentsService.getAppointmentById(appointmentId);
    }

	@GetMapping("/getAllAppointments")
    public List<Appointments> getAllAppointments() {
        return appointmentsService.getAllAppointments();
    }

    @DeleteMapping("deleteAppointment/{appointmentId}")
    public void deleteAppointment(@PathVariable("appointmentId") long appointmentId) {
    	appointmentsService.deleteAppointmentById(appointmentId);
    }
    
    @PutMapping(value="/updateAppointment/{appointmentId}")
	public ResponseEntity<Object> updateJobSeekers(@PathVariable("appointmentId")int appointmentId,@RequestBody Appointments appointments){
    	Appointments appointments1;
		boolean flag;
		if(appointmentsService.isAppointmentExits(appointmentId)) {
			flag=appointmentsService.updateAppointments(appointments);
		}else {
			flag=false;
		}
		return new ResponseEntity<>(flag,HttpStatus.OK);
	}
    
    @GetMapping("/appointments/doctor/{doctorId}")
    public List<Appointments> getAppointmentsByDoctorId(@PathVariable int doctorId) {
        return appointmentsService.getAppointmentsByDoctorId(doctorId);
    }
    
    @GetMapping("/appointments/{userId}")
    public List<Appointments> getAppointmentsByUserId(@PathVariable Long userId) {
        return appointmentsService.getAppointmentsByUserId(userId);
    }
}
