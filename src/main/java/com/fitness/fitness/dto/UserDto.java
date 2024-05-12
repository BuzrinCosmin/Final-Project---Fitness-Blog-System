package com.fitness.fitness.dto;

import com.fitness.fitness.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;

    private UserRole userRole;

}
