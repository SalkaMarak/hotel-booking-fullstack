package com.excelr.dto;
import java.util.List;
import lombok.Data;

@Data
public class HotelDTO {
	private Long id;
    private String name;
    private String address;
    private String contactInfo;
    private String description;
    private List<String> amenities;
    private List<String> images;

    public void setImages(List<String> images) {
        this.images = images;
    }
}

