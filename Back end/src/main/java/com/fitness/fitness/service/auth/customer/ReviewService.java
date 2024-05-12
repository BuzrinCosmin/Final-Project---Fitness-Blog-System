package com.fitness.fitness.service.auth.customer;

import com.fitness.fitness.entity.Review;

import java.util.List;

public interface ReviewService {

    Review createReview(Long adId, String postedBy, String content, String stars);

    List<Review> getReviewByAdId(Long adId);
}
