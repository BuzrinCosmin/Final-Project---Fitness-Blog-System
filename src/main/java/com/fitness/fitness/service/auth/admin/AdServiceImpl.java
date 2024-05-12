package com.fitness.fitness.service.auth.admin;

import com.fitness.fitness.dto.AdDto;
import com.fitness.fitness.dto.ListDto;
import com.fitness.fitness.dto.SearchDto;
import com.fitness.fitness.entity.Ad;
import com.fitness.fitness.repository.AdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class AdServiceImpl implements AdService {


    private final  AdRepository adRepository;
    public boolean postAd( AdDto adDto) throws IOException {
        try {
            Ad ad = new Ad();
            ad.setName(adDto.getName());
            ad.setType(adDto.getType());
            ad.setContent(adDto.getContent());
            ad.setImage(adDto.getImage().getBytes());
            ad.setPrice(adDto.getPrice());
            adRepository.save(ad);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public List<AdDto> getAllAds() {
        return adRepository.findAll().stream().map(Ad::getAdDto).collect(Collectors.toList());
    }

    @Override
    public void deleteAd(Long id) {
        adRepository.deleteById(id);
    }

    @Override
    public AdDto getAdById(Long id) {
        Optional<Ad> optionalAd = adRepository.findById(id);
        return optionalAd.map(Ad::getAdDto).orElse(null);
    }

    @Override
    public boolean updateAd(Long adId, AdDto adDto) throws IOException {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        if (optionalAd.isPresent()){
            Ad existingAd = optionalAd.get();
            if (adDto.getImage() != null)
                existingAd.setImage(adDto.getImage().getBytes());
            existingAd.setPrice(adDto.getPrice());
            existingAd.setName(adDto.getName());
            existingAd.setType(adDto.getType());
            existingAd.setContent(adDto.getContent());
            adRepository.save(existingAd);
            return true;
        } else {
            return false;
        }

    }

    @Override
    public ListDto searchAd(SearchDto searchDto) {
        Ad ad = new Ad();
        ad.setName(searchDto.getName());
        ad.setType(searchDto.getType());
        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll()
                .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());
        Example<Ad> adExample = Example.of(ad,exampleMatcher);
        List<Ad> adList = adRepository.findAll(adExample);
        ListDto listDto = new ListDto();
        listDto.setAdDtoList(adList.stream().map(Ad::getAdDto).collect(Collectors.toList()));
        return listDto;
    }
}


