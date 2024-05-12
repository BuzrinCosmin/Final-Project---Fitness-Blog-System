package com.fitness.fitness.entity;

import com.fitness.fitness.dto.AdDto;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "ads")
public class Ad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private String content;

    private Double price;

   @Lob
   @Column(columnDefinition = "longblob")
    private byte[] image;


   public AdDto getAdDto(){
       AdDto adDto = new AdDto();
       adDto.setId(id);
       adDto.setName(name);
       adDto.setType(type);
       adDto.setContent(content);
       adDto.setPrice(price);
       adDto.setReturnedImage(image);
       return adDto;
   }

}
