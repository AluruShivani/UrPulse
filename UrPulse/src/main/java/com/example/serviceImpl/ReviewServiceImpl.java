package com.example.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Reviews;
import com.example.repository.ReviewsRepository;
import com.example.service.ReviewsService;

@Service
public class ReviewServiceImpl implements ReviewsService{
	@Autowired
	private ReviewsRepository reviewRepository;

	@Override
	public Reviews createReview(Reviews review) {
		return reviewRepository.save(review);
	}

	@Override
	public Optional<Reviews> getReviewById(long reviewId) {
		return reviewRepository.findById(reviewId);
	}

	@Override
	public List<Reviews> getAllReviews() {
		return reviewRepository.findAll();
	}

	@Override
	public void deleteReviewById(long reviewId) {
		reviewRepository.deleteById(reviewId);
		
	}

	@Override
	public boolean isReviewExits(long reviewId) {
		return reviewRepository.existsById(reviewId);
	}

	@Override
	public boolean updateReview(Reviews review) {
		if(isReviewExits(review.getReviewId())) {
			reviewRepository.save(review);
			return true;
		}
		return false;
	}
	
	

}
