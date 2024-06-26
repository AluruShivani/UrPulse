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

import com.example.entity.Prescription;
import com.example.entity.Reviews;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.ReviewsService;

@RestController
@RequestMapping("api/v1")
public class ReviewsController {
	
	@Autowired
	private ReviewsService reviewservice;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	@PostMapping("addReviews")
	public Reviews createReviews(@RequestBody Reviews reviews) {
		reviews.setReviewId(databaseaSequencesGeneratorService.generateSequence(Reviews.SEQUENCE_NAME));
		return reviewservice.createReview(reviews);
	}
	
	@GetMapping("getReviewById/{reviewId}")
    public Optional<Reviews> getReviewById(@PathVariable("reviewId") long reviewId) {
        return reviewservice.getReviewById(reviewId);
    }
	
	@GetMapping("/getAllReviews")
    public List<Reviews> getAllReviews() {
        return reviewservice.getAllReviews();
    }

    @DeleteMapping("deleteReview/{reviewId}")
    public void deleteReview(@PathVariable("reviewId") long reviewId) {
    	reviewservice.deleteReviewById(reviewId);
    }
    
    @PutMapping(value="/updateReview/{reviewId}")
  	public ResponseEntity<Object> updateReviews(@PathVariable("reviewId")int reviewId,@RequestBody Reviews review){
    	Reviews review1;
  		boolean flag;
  		if(reviewservice.isReviewExits(reviewId)) {
  			flag=reviewservice.updateReview(review);
  		}else {
  			flag=false;
  		}
  		return new ResponseEntity<>(flag,HttpStatus.OK);
  	}

}
