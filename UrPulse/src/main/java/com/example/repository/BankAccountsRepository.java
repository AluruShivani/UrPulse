package com.example.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.BankAccount;
@Repository
public interface BankAccountsRepository extends MongoRepository<BankAccount, Long>{
	List<BankAccount> findByUserId(Long userId);

}
