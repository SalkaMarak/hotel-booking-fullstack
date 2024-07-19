package com.excelr.dao;

import com.excelr.entity.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> findByCustomerId(int customerId);
}
