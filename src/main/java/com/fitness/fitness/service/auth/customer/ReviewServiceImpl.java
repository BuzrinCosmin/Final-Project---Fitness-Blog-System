package com.fitness.fitness.service.auth.customer;

import com.fitness.fitness.entity.Ad;
import com.fitness.fitness.entity.Review;
import com.fitness.fitness.repository.AdRepository;
import com.fitness.fitness.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {


    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private AdRepository adRepository;
    @Override
    public Review createReview(Long adId, String postedBy, String content, String stars) {
        Optional<Ad> optionalAd= adRepository.findById(adId);
        if (optionalAd.isPresent()){
            Review review = new Review();

            review.setAd(optionalAd.get());
            review.setContent(content);
            review.setPostedBy(postedBy);
            review.setStars(stars);
            review.setCreatedAt(new Date());

            return reviewRepository.save(review);
        }
        throw new EntityNotFoundException("Ad not found");
    }


    @Override
    public List<Review> getReviewByAdId(Long adId) {

        return reviewRepository.findByAdId(adId);
    }


}
