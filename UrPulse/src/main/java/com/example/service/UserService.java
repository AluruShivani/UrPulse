package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.entity.Doctor;
import com.example.entity.User;
@Service
public interface UserService {
	User createUser(User user);
	Optional<User> getUserById(long userId);
	List<User> getAllUsers();
	void deleteUsersById(long userId);
	boolean isUsersExits(long userId);
	boolean updateUsers(User user);
	public User loginValidate(User user);

}
