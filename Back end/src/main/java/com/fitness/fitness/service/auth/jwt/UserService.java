package com.fitness.fitness.service.auth.jwt;


import com.fitness.fitness.dto.AdDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {

    UserDetailsService userDetailsService();

}
