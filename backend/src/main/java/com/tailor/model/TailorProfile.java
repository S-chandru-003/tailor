package com.tailor.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TailorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private String shopName;
    private String specialization;
    private Integer experience;
    private Double rating;
    private Integer totalRatings;
    private String description;
    private Boolean available;
}
