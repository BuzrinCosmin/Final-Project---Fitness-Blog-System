package com.fitness.fitness.service.auth.customer;

import com.fitness.fitness.dto.AdDto;
import com.fitness.fitness.dto.CartDto;
import com.fitness.fitness.dto.ListDto;
import com.fitness.fitness.dto.SearchDto;
import com.fitness.fitness.entity.Ad;
import com.fitness.fitness.entity.Cart;
import com.fitness.fitness.entity.User;
import com.fitness.fitness.enums.CartStatus;
import com.fitness.fitness.repository.AdRepository;
import com.fitness.fitness.repository.CartRepository;
import com.fitness.fitness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final AdRepository adRepository;

    private final UserRepository userRepository;

    private final CartRepository cartRepository;

    @Override
    public List<AdDto> getAllAds() {
        return adRepository.findAll().stream().map(Ad::getAdDto).collect(Collectors.toList());
    }



    @Override
    public boolean buyAd(CartDto cartDto) {
        Optional<Ad> optionalAd = adRepository.findById(cartDto.getAdId());
        Optional<User> optionalUser = userRepository.findById(cartDto.getUserId());
        if (optionalAd.isPresent() && optionalUser.isPresent()) {
            Ad existingAd = optionalAd.get();
            Cart cart = new Cart();
            cart.setUser(optionalUser.get());
            cart.setAd(existingAd);
            cart.setCartStatus(CartStatus.PENDING);
            return true;
        }
        return false;
    }

    @Override
    public AdDto getAdById(Long adId) {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        return optionalAd.map(Ad::getAdDto).orElse(null);
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

