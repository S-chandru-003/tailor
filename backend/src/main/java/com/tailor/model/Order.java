package com.tailor.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;
    
    @ManyToOne
    @JoinColumn(name = "tailor_id")
    private User tailor;
    
    private String clothType;
    private String gender;
    private String measurements;
    private String chest;
    private String waist;
    private String shoulder;
    private String length;
    private String sleeve;
    private String hip;
    private String inseam;
    private String thigh;
    private String knee;
    private String ankle;
    private String description;
    private String deliveryAddress;
    private String deliveryCity;
    private String deliveryState;
    private String deliveryPincode;
    private String deliveryPhone;
    private String preferredDate;
    private String budget;
    private Double price;
    private Double paymentRequested;
    private Boolean paymentPaid;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public enum OrderStatus {
        PENDING, NEGOTIATING, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
    }
}
