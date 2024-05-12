package com.fitness.fitness.service.auth.customer;

import com.fitness.fitness.entity.Comment;
import com.fitness.fitness.entity.Post;
import com.fitness.fitness.repository.CommentRepository;
import com.fitness.fitness.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    public Comment createComment(Long postId, String potedBy, String content){
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()){
            Comment comment = new Comment();

            comment.setPost(optionalPost.get());
            comment.setContent(content);
            comment.setPostedBy(potedBy);
            comment.setCreatedAt(new Date());

            return commentRepository.save(comment);
        }
        throw new EntityNotFoundException("Post not found");
    }


    public List<Comment> getCommentByPostId(Long postId){

        return commentRepository.findByPostId(postId);
    }
}
