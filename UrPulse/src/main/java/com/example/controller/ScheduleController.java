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

import com.example.entity.Reviews;
import com.example.entity.Schedule;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.ScheduleService;

@RestController
@RequestMapping("api/v1")
public class ScheduleController {
	@Autowired
	private ScheduleService scheduleservice;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	@PostMapping("addSchedule")
	public ResponseEntity<List<Schedule>> createSchedules(@RequestBody List<Schedule> schedules) {
	    schedules.forEach(schedule -> {
	        schedule.setScheduleId(databaseaSequencesGeneratorService.generateSequence(Schedule.SEQUENCE_NAME));
	        scheduleservice.createSchedule(schedule);
	    });
	    return new ResponseEntity<>(schedules, HttpStatus.CREATED);
	}

	
	@GetMapping("getScheduleById/{scheduleId}")
    public Optional<Schedule> getScheduleById(@PathVariable("scheduleId") long scheduleId) {
        return scheduleservice.getScheduleById(scheduleId);
    }
	
	@GetMapping("/getAllSchedule")
    public List<Schedule> getAllSchedule() {
        return scheduleservice.getAllSchedules();
    }

    @DeleteMapping("deleteSchedule/{scheduleId}")
    public void deleteSchedule(@PathVariable("scheduleId") long scheduleId) {
    	scheduleservice.deleteScheduleById(scheduleId);
    }
    
    @PutMapping(value = "/updateSchedule/{scheduleId}") // Correct mapping annotation
    public ResponseEntity<Object> updateSchedule(@PathVariable("scheduleId") long scheduleId, @RequestBody Schedule schedule) {
        boolean updated = scheduleservice.updateSchedule(scheduleId, schedule);
        if (updated) {
            return new ResponseEntity<>("Schedule updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Schedule not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/doctor/{doctorId}/schedule")
    public List<Schedule> getScheduleByDoctorId(@PathVariable Long doctorId) {
        return scheduleservice.getScheduleByDoctorId(doctorId);
    }


}
