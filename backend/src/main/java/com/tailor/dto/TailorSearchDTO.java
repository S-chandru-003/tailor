package com.tailor.dto;

import lombok.Data;

@Data
public class TailorSearchDTO {
    private Long id;
    private String name;
    private String shopName;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String specialization;
    private Integer experience;
    private Double rating;
    private Integer totalRatings;
    private String description;
    private Boolean available;
}
