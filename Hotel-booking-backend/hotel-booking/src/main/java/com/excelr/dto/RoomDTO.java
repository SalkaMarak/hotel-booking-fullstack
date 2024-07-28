package com.excelr.dto;

import java.util.List;
import lombok.Data;

@Data
public class RoomDTO {
    private Long id;
    private String roomType;
    private boolean isBooked;
    private double pricePerNight;
    private Long hotelId;
    private String hotelName; 
    private List<String> images;
}
