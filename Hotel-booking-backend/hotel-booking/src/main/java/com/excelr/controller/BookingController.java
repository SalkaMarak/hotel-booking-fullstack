package com.excelr.controller;

import com.excelr.dto.BookingDTO;
import com.excelr.dto.BookingResponseDTO;
import com.excelr.entity.Booking;
import com.excelr.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingDTO bookingDTO) {
        System.out.println("BookingDTO: " + bookingDTO);
        Booking booking = bookingService.createBooking(bookingDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }

    @GetMapping
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {
        List<BookingResponseDTO> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsByUserId(@PathVariable Long userId) {
        List<BookingResponseDTO> bookings = bookingService.findBookingsByUserId(userId);
        return ResponseEntity.ok(bookings);
    }
    
    @PostMapping("/cancel/{bookingId}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long bookingId) {
        Booking booking = bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok(booking);
    }
    
    @PostMapping("/reactivate/{bookingId}")
    public ResponseEntity<Booking> reactivateBooking(@PathVariable Long bookingId) {
        Booking booking = bookingService.reactivateBooking(bookingId);
        return ResponseEntity.ok(booking);
    }
}
