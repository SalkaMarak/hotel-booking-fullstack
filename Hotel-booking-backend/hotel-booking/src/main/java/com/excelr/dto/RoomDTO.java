package com.excelr.dto;

import java.util.List;

import lombok.Data;

@Data
public class RoomDTO {
    private Long id;
    private String roomType;
    private int numberOfRoomsAvailable;
    private double pricePerNight;
    private Long hotelId;
    private List<String> images;
}
