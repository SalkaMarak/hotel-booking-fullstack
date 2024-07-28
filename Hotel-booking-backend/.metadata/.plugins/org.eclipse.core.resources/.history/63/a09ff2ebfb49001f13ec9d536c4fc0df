package com.excelr.controller;

import com.excelr.dto.HotelDTO;
import com.excelr.entity.Hotel;
import com.excelr.service.HotelService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @PostMapping("/register")
    public ResponseEntity<Hotel> registerHotel(@RequestPart("hotel") String hotelData,
                                               @RequestPart("images") List<MultipartFile> images) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Hotel hotel = objectMapper.readValue(hotelData, Hotel.class);
        Hotel createdHotel = hotelService.saveHotel(hotel, images);
        return new ResponseEntity<>(createdHotel, HttpStatus.CREATED);
    }
    //RequestPart Annotation: Use @RequestPart annotation instead of @RequestParam for multipart requests when dealing with multiple parts (in this case, hotel and images).
    //ObjectMapper for JSON: Use ObjectMapper to deserialize the JSON string (hotelData) into your Hotel object
    
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        Hotel hotel = hotelService.getHotelById(id);
        if (hotel != null) {
            return ResponseEntity.ok(hotel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<HotelDTO>> getAllHotels() {
        List<HotelDTO> hotels = hotelService.getAllHotels();
        return new ResponseEntity<>(hotels, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return ResponseEntity.noContent().build();
    }
}