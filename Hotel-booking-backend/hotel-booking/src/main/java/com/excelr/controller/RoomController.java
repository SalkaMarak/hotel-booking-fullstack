package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.excelr.dto.RoomDTO;
import com.excelr.service.RoomService;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public RoomDTO createRoom(@RequestPart("room") RoomDTO roomDTO, @RequestPart("images") List<MultipartFile> images) throws IOException {
        roomDTO.setImages(images.stream().map(image -> {
            try {
                return Base64.getEncoder().encodeToString(image.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList()));

        return roomService.createRoom(roomDTO);
    }

    @PutMapping("/{id}")
    public RoomDTO updateRoom(@PathVariable Long id, @RequestPart("room") RoomDTO roomDTO, @RequestPart("images") List<MultipartFile> images) throws IOException {
        roomDTO.setImages(images.stream().map(image -> {
            try {
                return Base64.getEncoder().encodeToString(image.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList()));

        return roomService.updateRoom(id, roomDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }

    @GetMapping("/hotel/{hotelId}")
    public List<RoomDTO> getRoomsByHotelId(@PathVariable Long hotelId) {
        return roomService.getRoomsByHotelId(hotelId);
    }
}
