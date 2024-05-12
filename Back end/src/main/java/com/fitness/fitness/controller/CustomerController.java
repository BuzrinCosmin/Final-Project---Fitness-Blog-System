package com.fitness.fitness.controller;

import com.fitness.fitness.dto.AdDto;
import com.fitness.fitness.dto.CartDto;
import com.fitness.fitness.dto.SearchDto;
import com.fitness.fitness.entity.Post;
import com.fitness.fitness.service.auth.customer.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/customer")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private ReviewService reviewService;



    @GetMapping("/ads")
    public ResponseEntity<List<AdDto>> getAllAds() {
        List<AdDto> adDtoList = customerService.getAllAds();
        return ResponseEntity.ok(adDtoList);
    }

    @PostMapping("/ad/cart")
    public ResponseEntity<Void> cart(@RequestBody CartDto cartDto) {
        boolean succes = customerService.buyAd(cartDto);
        if (succes) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/ad/{adId}")
    public ResponseEntity<AdDto> getAdById(@PathVariable Long adId) {
        AdDto adDto = customerService.getAdById(adId);
        if (adDto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(adDto);
    }

    @PostMapping("/ad/search")
    public ResponseEntity<?> searchAd(@RequestBody SearchDto searchDto) {
        return ResponseEntity.ok(customerService.searchAd(searchDto));

    }

    @PostMapping("/post")
    public ResponseEntity<?> createPost(@RequestBody Post post) {
        try {
            Post createdPost = postService.savePost(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(postService.getAllPosts());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable Long postId){
        try {
            Post post = postService.getPostById(postId);
            return ResponseEntity.ok(post);
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        }
    }

    @PutMapping("/posts/like/{postId}")
    public  ResponseEntity<?> likePost(@PathVariable Long postId){
        try {
            postService.likePost(postId);
            return  ResponseEntity.ok(new String[]{"Post liked succesfully."});
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/comment")
    public ResponseEntity<?> createComent(@RequestParam Long postId, @RequestParam String postedBy, @RequestBody String content){
        try {
            return ResponseEntity.ok(commentService.createComment(postId,postedBy,content));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @GetMapping("/comment/{postId}")
    public ResponseEntity<?> getCommentsByPostId(@PathVariable Long postId){
        try {
            return ResponseEntity.ok(commentService.getCommentByPostId(postId));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    @PostMapping("/review")
    public ResponseEntity<?> createReview(@RequestParam Long adId, @RequestParam String postedBy, @RequestParam String stars,@RequestBody String content){
        try {
            return ResponseEntity.ok(reviewService.createReview(adId,postedBy,stars,content));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @GetMapping("/review/{adId}")
    public ResponseEntity<?> getReviewByAdId(@PathVariable Long adId){
        try {
            return ResponseEntity.ok(reviewService.getReviewByAdId(adId));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }


}