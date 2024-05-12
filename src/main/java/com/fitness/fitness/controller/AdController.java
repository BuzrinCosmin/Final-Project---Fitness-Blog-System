package com.fitness.fitness.controller;

import com.fitness.fitness.dto.AdDto;
import com.fitness.fitness.dto.SearchDto;
import com.fitness.fitness.service.auth.admin.AdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdController {

    private final AdService adService;

    @PostMapping("/ad")
    public ResponseEntity<?> postAd( @ModelAttribute AdDto adDto) throws IOException {
        boolean succes = adService.postAd(adDto);
        if (succes){
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/ads")
    public ResponseEntity<?> getAllAds(){
        return ResponseEntity.ok(adService.getAllAds());
    }

    @DeleteMapping("/ad/{id}")
    public ResponseEntity<Void> deleteAd(@PathVariable Long id){
       adService.deleteAd(id);
       return ResponseEntity.ok(null);
    }

    @GetMapping("/ad/{id}")
    public ResponseEntity<AdDto> getAdById(@PathVariable Long id) {
        AdDto adDto = adService.getAdById(id);
        return ResponseEntity.ok(adDto);
    }

    @PutMapping("/ad/{adId}")
    public ResponseEntity<Void> updateAd(@PathVariable Long adId, @ModelAttribute AdDto adDto) throws IOException {
        try {
            boolean succes = adService.updateAd(adId, adDto);
            if (succes) return ResponseEntity.status(HttpStatus.OK).build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

   @PostMapping("/ad/search")
    public ResponseEntity<?> searchAd(@RequestBody SearchDto searchDto){
        return ResponseEntity.ok(adService.searchAd(searchDto));
    }

}