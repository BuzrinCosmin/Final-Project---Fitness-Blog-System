package com.fitness.fitness.service.auth.admin;


import com.fitness.fitness.dto.AdDto;
import com.fitness.fitness.dto.ListDto;
import com.fitness.fitness.dto.SearchDto;
import com.fitness.fitness.entity.Ad;

import java.io.IOException;
import java.util.List;

public interface AdService {

    boolean postAd( AdDto adDto) throws IOException;

    List<AdDto> getAllAds();

    void deleteAd(Long id);

    AdDto getAdById(Long id);

    boolean updateAd(Long adId, AdDto adDto) throws IOException;

    ListDto searchAd(SearchDto searchDto);




}
