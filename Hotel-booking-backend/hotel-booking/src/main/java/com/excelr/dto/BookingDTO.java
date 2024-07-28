package com.excelr.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class BookingDTO {
    private Long roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String customerName;
    private String customerEmail;
    private Long userId;
}
