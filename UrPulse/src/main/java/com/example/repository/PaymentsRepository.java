package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Payment;
@Repository
public interface PaymentsRepository extends MongoRepository<Payment, Long> {

}
