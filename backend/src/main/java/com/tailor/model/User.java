package com.tailor.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    private String password;
    private String phone;
    
    @Enumerated(EnumType.STRING)
    private Role role;
    
    private String address;
    private String city;
    private String state;
    
    public enum Role {
        CUSTOMER, TAILOR
    }
}
