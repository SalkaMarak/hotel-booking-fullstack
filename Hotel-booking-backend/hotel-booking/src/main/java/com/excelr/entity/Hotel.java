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
    @ElementCollection //Using @ElementCollection provides flexibility in modeling relationships and storing collections of basic types or embeddable objects without needing to create separate entity classes for them.
    private List<String> amenities;
    // Ensure to add @JsonBackReference to prevent recursion
    @JsonManagedReference
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HotelImage> images = new ArrayList<>();

}
