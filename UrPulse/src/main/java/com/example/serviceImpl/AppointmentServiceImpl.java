package com.example.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Appointments;
import com.example.repository.AppointmentsRepository;
import com.example.service.AppointmentsService;

@Service
public class AppointmentServiceImpl implements AppointmentsService {
	@Autowired
	private AppointmentsRepository appointmentRepository;

	@Override
	public Appointments createAppointment(Appointments appointment) {
		return appointmentRepository.save(appointment);
	}

	@Override
	public Optional<Appointments> getAppointmentById(long appointmentId) {
		return appointmentRepository.findById(appointmentId);
	}

	@Override
	public List<Appointments> getAllAppointments() {
		return appointmentRepository.findAll();
	}

	@Override
	public void deleteAppointmentById(long appointmentId) {
		appointmentRepository.deleteById(appointmentId);
		
	}

	@Override
	public boolean updateAppointments(Appointments appointments) {
		if(isAppointmentExits(appointments.getAppointmentId())) {
			appointmentRepository.save(appointments);
			return true;
		}
		return false;
	}

	@Override
	public boolean isAppointmentExits(long appointmentId) {
		return appointmentRepository.existsById(appointmentId);
	}

	@Override
    public List<Appointments> getAppointmentsByDoctorId(int doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

	@Override
	public List<Appointments> getAppointmentsByUserId(Long userId) {
		  return appointmentRepository.findByUserId(userId);
	}

}
