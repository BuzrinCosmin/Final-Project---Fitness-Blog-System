package com.fitness.fitness.dto;

import com.fitness.fitness.enums.CartStatus;
import lombok.Data;

import java.util.Date;


@Data
public class CartDto {

    private Long id;

    private CartStatus cartStatus;

    private Long adId;

    private Long userId;

    private String username;

    private String email;

}