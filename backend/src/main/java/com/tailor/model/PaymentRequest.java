package com.tailor.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class PaymentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    
    @ManyToOne
    @JoinColumn(name = "tailor_id")
    private User tailor;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;
    
    private Double amount;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    
    private String description;
    private LocalDateTime requestedAt;
    private LocalDateTime paidAt;
    
    public enum PaymentStatus {
        PENDING, PAID, CANCELLED
    }
}
