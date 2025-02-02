package com.excelr.service;

import com.excelr.entity.Hotel;
import com.excelr.entity.HotelImage;
import com.excelr.dao.HotelRepository;
import com.excelr.dto.HotelDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Transactional
    public Hotel saveHotel(Hotel hotel, List<MultipartFile> imageFiles) throws IOException {
        List<HotelImage> hotelImages = new ArrayList<>();
        for (MultipartFile imageFile : imageFiles) {
            HotelImage hotelImage = new HotelImage();
            hotelImage.setHotel(hotel);
            hotelImage.setImageData(imageFile.getBytes());
            hotelImages.add(hotelImage);
        }
        hotel.setImages(hotelImages);
        return hotelRepository.save(hotel);
    }

    public List<HotelDTO> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        return hotels.stream().map(hotel -> {
            HotelDTO hotelDTO = new HotelDTO();
            hotelDTO.setId(hotel.getId());
            hotelDTO.setName(hotel.getName());
            hotelDTO.setAddress(hotel.getAddress());
            hotelDTO.setContactInfo(hotel.getContactInfo());
            hotelDTO.setDescription(hotel.getDescription());
            hotelDTO.setAmenities(hotel.getAmenities());

            List<String> base64Images = hotel.getImages().stream()
                .map((HotelImage image) -> Base64.getEncoder().encodeToString(image.getImageData()))
                .collect(Collectors.toList());
            hotelDTO.setImages(base64Images);

            return hotelDTO;
        }).collect(Collectors.toList());
    }

    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElse(null);
    }

    @Transactional
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}
