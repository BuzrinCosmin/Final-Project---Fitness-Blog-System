package com.fitness.fitness.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private Date createdAt;

    private String postedBy;

    private String stars;

    @ManyToOne
    @JoinColumn(name = "ad_id", nullable = false)
    private Ad ad;
}
