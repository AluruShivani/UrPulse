package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Admin;
import com.example.entity.User;
@Repository
public interface UserRepository extends MongoRepository<User, Long>{
	public User findByMobileAndPassword(String mobile, String password);

}
