package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.example.entity.Schedule;
@Service
public interface ScheduleService {
	Schedule createSchedule(Schedule schedule);
	Optional<Schedule> getScheduleById(long scheduleId);
	List<Schedule> getAllSchedules();
	void deleteScheduleById(long scheduleId);
	boolean isScheduleExits(long scheduleId);
	//boolean updateSchedule(Schedule schedule);
	 boolean updateSchedule(long scheduleId, Schedule schedule);
	 List<Schedule> getScheduleByDoctorId(Long doctorId);

}
