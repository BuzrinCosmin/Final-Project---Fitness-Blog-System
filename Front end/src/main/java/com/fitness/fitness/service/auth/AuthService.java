package com.fitness.fitness.service.auth;

import com.fitness.fitness.dto.SignupRequest;
import com.fitness.fitness.dto.UserDto;

public interface AuthService {

    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
