package com.excelr.service;

import com.excelr.dto.RoomDTO;
import com.excelr.entity.Hotel;
import com.excelr.entity.Room;
import com.excelr.entity.RoomImage;
import com.excelr.dao.HotelRepository;
import com.excelr.dao.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    public RoomDTO createRoom(RoomDTO roomDTO) {
        Room room = new Room();
        room.setRoomType(roomDTO.getRoomType());
        room.setPricePerNight(roomDTO.getPricePerNight());
        room.setBooked(false); // Initialize as not booked

        Hotel hotel = hotelRepository.findById(roomDTO.getHotelId()).orElseThrow(() -> new RuntimeException("Hotel not found"));
        room.setHotel(hotel);

        List<RoomImage> images = roomDTO.getImages().stream().map(imageData -> {
            RoomImage roomImage = new RoomImage();
            roomImage.setData(Base64.getDecoder().decode(imageData));
            roomImage.setRoom(room);
            return roomImage;
        }).collect(Collectors.toList());

        room.setImages(images);
        roomRepository.save(room);

        roomDTO.setId(room.getId());
        roomDTO.setBooked(room.isBooked());
        return roomDTO;
    }

    public RoomDTO updateRoom(Long roomId, RoomDTO roomDTO) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));

        room.setRoomType(roomDTO.getRoomType());
        room.setPricePerNight(roomDTO.getPricePerNight());
        room.setBooked(roomDTO.isBooked());

        List<RoomImage> images = roomDTO.getImages().stream().map(imageData -> {
            RoomImage roomImage = new RoomImage();
            roomImage.setData(Base64.getDecoder().decode(imageData));
            roomImage.setRoom(room);
            return roomImage;
        }).collect(Collectors.toList());

        room.setImages(images);
        roomRepository.save(room);

        return roomDTO;
    }

    public void deleteRoom(Long roomId) {
        roomRepository.deleteById(roomId);
    }

    public List<RoomDTO> getRoomsByHotelId(Long hotelId) {
        List<Room> rooms = roomRepository.findByHotelId(hotelId);
        return rooms.stream().map(room -> {
            RoomDTO roomDTO = new RoomDTO();
            roomDTO.setId(room.getId());
            roomDTO.setRoomType(room.getRoomType());
            roomDTO.setPricePerNight(room.getPricePerNight());
            roomDTO.setBooked(room.isBooked());
            roomDTO.setHotelId(room.getHotel().getId());

            List<String> base64Images = room.getImages().stream()
                .map(image -> Base64.getEncoder().encodeToString(image.getData()))
                .collect(Collectors.toList());
            roomDTO.setImages(base64Images);

            return roomDTO;
        }).collect(Collectors.toList());
    }
}
