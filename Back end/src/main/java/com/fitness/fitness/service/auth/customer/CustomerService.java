package com.fitness.fitness.service.auth.customer;

import com.fitness.fitness.dto.AdDto;
import com.fitness.fitness.dto.CartDto;
import com.fitness.fitness.dto.ListDto;
import com.fitness.fitness.dto.SearchDto;

import java.util.List;

public interface CustomerService {

    List<AdDto> getAllAds();

    boolean buyAd(CartDto cartDto);

    AdDto getAdById(Long adId);

    ListDto searchAd(SearchDto searchDto);




}
