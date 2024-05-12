package com.fitness.fitness.service.auth.customer;

import com.fitness.fitness.entity.Post;

import java.util.List;

public interface PostService {

    Post savePost(Post post);

    List<Post> getAllPosts();

    Post getPostById(Long postId);
    void likePost(Long postId);
}
