package com.excelr.service;

import com.excelr.dao.BookingRepository;
import com.excelr.dao.CustomerRepository;
import com.excelr.dao.RoomRepository;
import com.excelr.dto.BookingDTO;
import com.excelr.dto.BookingResponseDTO;
import com.excelr.dto.RoomDTO;
import com.excelr.entity.Booking;
import com.excelr.entity.Customer;
import com.excelr.entity.Room;

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
    private CustomerRepository customerRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Transactional
    public Booking createBooking(BookingDTO bookingDTO) {
        Room room = roomRepository.findById(bookingDTO.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid room ID"));

        Customer customer = customerRepository.findById(bookingDTO.getCustomerId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid customer ID"));

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
        booking.setCustomer(customer); // Set the customer

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

    public List<BookingResponseDTO> findBookingsByCustomerId(int customerId) {
        return bookingRepository.findByCustomerId(customerId).stream().map(this::convertToResponseDTO).collect(Collectors.toList());
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
        // roomDTO.setImages(booking.getRoom().getImages().stream()
        //         .map(image -> Base64.getEncoder().encodeToString(image.getData()))
        //         .collect(Collectors.toList()));

        responseDTO.setRoom(roomDTO);

        return responseDTO;
    }
}
