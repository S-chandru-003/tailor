package com.tailor.controller;

import com.tailor.model.User;
import com.tailor.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginRequest) {
        System.out.println("Login attempt for email: " + loginRequest.getEmail());
        User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            System.out.println("Login successful for: " + user.getEmail());
            return ResponseEntity.ok(user);
        } else {
            System.out.println("Login failed - invalid credentials");
            return ResponseEntity.status(401).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
    
    @GetMapping("/tailors")
    public ResponseEntity<List<User>> getAllTailors() {
        return ResponseEntity.ok(userService.getAllTailors());
    }
}
