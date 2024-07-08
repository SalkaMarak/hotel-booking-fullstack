package com.excelr.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.entity.HotelImage;

@Repository
public interface HotelImageRepository extends JpaRepository<HotelImage, Long> {
}

