package com.excelr.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

}
