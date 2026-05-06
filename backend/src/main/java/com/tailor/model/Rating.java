package com.tailor.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "tailor_id")
    private User tailor;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;
    
    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
    
    private Integer rating;
    private String review;
    private LocalDateTime createdAt;
}
