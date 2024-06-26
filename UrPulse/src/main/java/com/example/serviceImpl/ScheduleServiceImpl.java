package com.example.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Schedule;
import com.example.repository.ScheduleRepository;
import com.example.service.ScheduleService;

@Service
public class ScheduleServiceImpl implements ScheduleService{
	@Autowired
	private ScheduleRepository scheduleRepository;

	@Override
	public Schedule createSchedule(Schedule schedule) {
		return scheduleRepository.save(schedule);
	}

	@Override
	public Optional<Schedule> getScheduleById(long scheduleId) {
		return scheduleRepository.findById(scheduleId);
	}

	@Override
	public List<Schedule> getAllSchedules() {
		return scheduleRepository.findAll();
	}

	@Override
	public void deleteScheduleById(long scheduleId) {
		scheduleRepository.deleteById(scheduleId);
		
	}

	@Override
	public boolean isScheduleExits(long scheduleId) {
		return scheduleRepository.existsById(scheduleId);
	}

	

	@Override
	public List<Schedule> getScheduleByDoctorId(Long doctorId) {
		return scheduleRepository.findByDoctorId(doctorId);
	}

	@Override
    public boolean updateSchedule(long scheduleId, Schedule updatedSchedule) {
        Optional<Schedule> existingSchedule = scheduleRepository.findById(scheduleId);
        if (existingSchedule.isPresent()) {
            Schedule schedule = existingSchedule.get();
            // Update fields that are allowed to be updated
            schedule.setDay(updatedSchedule.getDay());
            schedule.setTimings(updatedSchedule.getTimings());
            schedule.setStatus(updatedSchedule.getStatus());
            scheduleRepository.save(schedule);
            return true;
        }
        return false;
    }
	
	

}
