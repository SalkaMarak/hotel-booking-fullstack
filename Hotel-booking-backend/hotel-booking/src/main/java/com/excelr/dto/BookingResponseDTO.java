package com.excelr.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingResponseDTO {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Double totalCost;
    private String customerName;
    private String customerEmail;
    private boolean cancellationStatus;
    private Double refundAmount;
    private RoomDTO room; // Include room details
}
