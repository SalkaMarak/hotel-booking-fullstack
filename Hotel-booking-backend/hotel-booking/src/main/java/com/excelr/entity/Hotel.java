package com.excelr.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String contactInfo;
    private String description;

    @ElementCollection
    private List<String> amenities;

    @JsonManagedReference
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<HotelImage> images = new ArrayList<>();

    // Add relationship to Room entity
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Room> rooms = new ArrayList<>();
}
