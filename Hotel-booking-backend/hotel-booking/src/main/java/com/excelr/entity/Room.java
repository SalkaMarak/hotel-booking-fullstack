package com.excelr.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomType;
    @Column(name = "is_booked")
    private boolean isBooked;
    private double pricePerNight;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RoomImage> images;
    
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Booking> bookings;
}
