package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Reviews;
@Repository
public interface ReviewsRepository extends MongoRepository<Reviews, Long>{

}
