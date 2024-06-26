package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.entity.Appointments;
@Service
public interface AppointmentsService {
	
	 Appointments createAppointment(Appointments appointment);
	    Optional<Appointments> getAppointmentById(long appointmentId);
	    List<Appointments> getAllAppointments();
	    void deleteAppointmentById(long appointmentId);
	    boolean updateAppointments(Appointments appointments);
	    boolean isAppointmentExits(long appointmentId);
	    List<Appointments> getAppointmentsByDoctorId(int doctorId);
	    List<Appointments> getAppointmentsByUserId(Long userId);

}
