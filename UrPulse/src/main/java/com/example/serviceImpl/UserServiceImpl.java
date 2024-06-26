package com.example.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Doctor;
import com.example.entity.User;
import com.example.repository.UserRepository;
import com.example.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository userRepository;

	@Override
	public User createUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public Optional<User> getUserById(long userId) {
		return userRepository.findById(userId);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public void deleteUsersById(long userId) {
		userRepository.deleteById(userId);
		
	}

	@Override
	public boolean isUsersExits(long userId) {
		return userRepository.existsById(userId);
	}

	@Override
	public boolean updateUsers(User user) {
		if(isUsersExits(user.getUserId())) {
			userRepository.save(user);
			return true;
		}
		return false;
	}

	@Override
	public User loginValidate(User user) {
		User user1= userRepository.findByMobileAndPassword(user.getMobile(), user.getPassword());
		System.out.println("what is there in Doctor=" + user1);
		return user1;
	}

	
	
	

}
