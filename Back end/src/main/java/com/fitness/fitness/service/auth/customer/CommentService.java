package com.fitness.fitness.service.auth.customer;

import com.fitness.fitness.entity.Comment;

import java.util.List;

public interface CommentService {
    Comment createComment(Long postId, String potedBy, String content);

    List<Comment> getCommentByPostId(Long postId);
}
