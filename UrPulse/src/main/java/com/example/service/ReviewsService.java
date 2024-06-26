package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.example.entity.Reviews;
@Service
public interface ReviewsService {
	Reviews createReview(Reviews review);
	Optional<Reviews> getReviewById(long reviewId);
	List<Reviews> getAllReviews();
	void deleteReviewById(long reviewId);
	boolean isReviewExits(long reviewId);
	boolean updateReview(Reviews review);

}
