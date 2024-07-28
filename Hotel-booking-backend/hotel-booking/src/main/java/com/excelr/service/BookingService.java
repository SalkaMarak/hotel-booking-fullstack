package com.excelr.service;

import com.excelr.dao.BookingRepository;
import com.excelr.dao.RoomRepository;
import com.excelr.dao.UserRepository;
import com.excelr.dto.BookingDTO;
import com.excelr.dto.BookingResponseDTO;
import com.excelr.dto.RoomDTO;
import com.excelr.entity.Booking;
import com.excelr.entity.Room;
import com.excelr.entity.User;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Transactional
    public Booking createBooking(BookingDTO bookingDTO) {
        Room room = roomRepository.findById(bookingDTO.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid room ID"));

        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        if (room.isBooked()) {
            throw new IllegalStateException("Room is already booked");
        }

        // Calculate total cost based on room price and duration
        long nights = ChronoUnit.DAYS.between(bookingDTO.getCheckInDate(), bookingDTO.getCheckOutDate());
        double totalCost = nights * room.getPricePerNight();

        Booking booking = new Booking();
        booking.setRoom(room);
        booking.setCheckInDate(bookingDTO.getCheckInDate());
        booking.setCheckOutDate(bookingDTO.getCheckOutDate());
        booking.setTotalCost(totalCost);
        booking.setCustomerName(bookingDTO.getCustomerName());
        booking.setCustomerEmail(bookingDTO.getCustomerEmail());
        booking.setCancellationStatus(false);
        booking.setRefundAmount(0.0);
        booking.setUser(user); // Set the user

        room.setBooked(true); // Mark room as booked
        roomRepository.save(room); // Save room status

        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid booking ID"));

        if (!booking.isCancellationStatus()) {
            double refundAmount = calculateRefund(booking);
            booking.setRefundAmount(refundAmount);
            booking.setCancellationStatus(true);

            Room room = booking.getRoom();
            room.setBooked(false); // Unmark room as booked
            roomRepository.save(room); // Save room status
        }

        return bookingRepository.save(booking);
    }

    private double calculateRefund(Booking booking) {
        return booking.getTotalCost();
    }

    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll().stream().map(this::convertToResponseDTO).collect(Collectors.toList());
    }

    public List<BookingResponseDTO> findBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId).stream().map(this::convertToResponseDTO).collect(Collectors.toList());
    }

    private BookingResponseDTO convertToResponseDTO(Booking booking) {
        BookingResponseDTO responseDTO = new BookingResponseDTO();
        responseDTO.setId(booking.getId());
        responseDTO.setCheckInDate(booking.getCheckInDate());
        responseDTO.setCheckOutDate(booking.getCheckOutDate());
        responseDTO.setTotalCost(booking.getTotalCost());
        responseDTO.setCustomerName(booking.getCustomerName());
        responseDTO.setCustomerEmail(booking.getCustomerEmail());
        responseDTO.setCancellationStatus(booking.isCancellationStatus());
        responseDTO.setRefundAmount(booking.getRefundAmount());

        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(booking.getRoom().getId());
        roomDTO.setRoomType(booking.getRoom().getRoomType());
        roomDTO.setBooked(booking.getRoom().isBooked());
        roomDTO.setPricePerNight(booking.getRoom().getPricePerNight());
        roomDTO.setHotelId(booking.getRoom().getHotel().getId());
        roomDTO.setHotelName(booking.getRoom().getHotel().getName());
        roomDTO.setImages(null);

        responseDTO.setRoom(roomDTO);

        return responseDTO;
    }
    @Transactional
    public Booking reactivateBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid booking ID"));

        if (booking.isCancellationStatus()) {
            booking.setCancellationStatus(false);
            booking.setRefundAmount(0.0);

            Room room = booking.getRoom();
            room.setBooked(true);
            roomRepository.save(room);
        }

        return bookingRepository.save(booking);
    }
}
