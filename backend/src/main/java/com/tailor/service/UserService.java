package com.tailor.service;

import com.tailor.model.User;
import com.tailor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    
    public User register(User user) {
        return userRepository.save(user);
    }
    
    public User login(String email, String password) {
        System.out.println("Attempting to find user with email: " + email);
        return userRepository.findByEmail(email)
            .map(user -> {
                System.out.println("User found: " + user.getEmail());
                System.out.println("Password match: " + user.getPassword().equals(password));
                if (user.getPassword().equals(password)) {
                    return user;
                }
                return null;
            })
            .orElseGet(() -> {
                System.out.println("No user found with email: " + email);
                return null;
            });
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
    public List<User> getAllTailors() {
        return userRepository.findByRole(User.Role.TAILOR);
    }
}
