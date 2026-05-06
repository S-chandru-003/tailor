package com.tailor.service;

import com.tailor.dto.TailorSearchDTO;
import com.tailor.model.*;
import com.tailor.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TailorService {
    private final UserRepository userRepository;
    private final TailorProfileRepository tailorProfileRepository;
    private final OrderRepository orderRepository;
    private final MessageRepository messageRepository;
    private final RatingRepository ratingRepository;
    private final PaymentRequestRepository paymentRequestRepository;
    
    public List<TailorSearchDTO> searchTailorsByCity(String city) {
        List<User> tailors = userRepository.findByRoleAndCity(User.Role.TAILOR, city);
        return tailors.stream().map(tailor -> {
            TailorSearchDTO dto = new TailorSearchDTO();
            dto.setId(tailor.getId());
            dto.setName(tailor.getName());
            dto.setPhone(tailor.getPhone());
            dto.setAddress(tailor.getAddress());
            dto.setCity(tailor.getCity());
            dto.setState(tailor.getState());
            
            tailorProfileRepository.findByUserId(tailor.getId()).ifPresent(profile -> {
                dto.setShopName(profile.getShopName());
                dto.setSpecialization(profile.getSpecialization());
                dto.setExperience(profile.getExperience());
                dto.setRating(profile.getRating());
                dto.setTotalRatings(profile.getTotalRatings());
                dto.setDescription(profile.getDescription());
                dto.setAvailable(profile.getAvailable());
            });
            
            return dto;
        }).collect(Collectors.toList());
    }
    
    public Order createOrder(Order order) {
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.PENDING);
        return orderRepository.save(order);
    }
    
    public Message sendMessage(Message message) {
        message.setSentAt(LocalDateTime.now());
        return messageRepository.save(message);
    }
    
    public List<Message> getOrderMessages(Long orderId) {
        return messageRepository.findByOrderIdOrderBySentAtAsc(orderId);
    }
    
    public Order updateOrder(Long orderId, Order orderUpdate) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        if (orderUpdate.getMeasurements() != null) order.setMeasurements(orderUpdate.getMeasurements());
        if (orderUpdate.getPrice() != null) order.setPrice(orderUpdate.getPrice());
        if (orderUpdate.getStatus() != null) order.setStatus(orderUpdate.getStatus());
        if (orderUpdate.getGender() != null) order.setGender(orderUpdate.getGender());
        if (orderUpdate.getChest() != null) order.setChest(orderUpdate.getChest());
        if (orderUpdate.getWaist() != null) order.setWaist(orderUpdate.getWaist());
        if (orderUpdate.getShoulder() != null) order.setShoulder(orderUpdate.getShoulder());
        if (orderUpdate.getLength() != null) order.setLength(orderUpdate.getLength());
        if (orderUpdate.getSleeve() != null) order.setSleeve(orderUpdate.getSleeve());
        if (orderUpdate.getHip() != null) order.setHip(orderUpdate.getHip());
        if (orderUpdate.getInseam() != null) order.setInseam(orderUpdate.getInseam());
        if (orderUpdate.getThigh() != null) order.setThigh(orderUpdate.getThigh());
        if (orderUpdate.getKnee() != null) order.setKnee(orderUpdate.getKnee());
        if (orderUpdate.getAnkle() != null) order.setAnkle(orderUpdate.getAnkle());
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }
    
    public Rating addRating(Rating rating) {
        rating.setCreatedAt(LocalDateTime.now());
        Rating saved = ratingRepository.save(rating);
        updateTailorRating(rating.getTailor().getId());
        return saved;
    }
    
    private void updateTailorRating(Long tailorId) {
        List<Rating> ratings = ratingRepository.findByTailorId(tailorId);
        double avgRating = ratings.stream().mapToInt(Rating::getRating).average().orElse(0.0);
        
        tailorProfileRepository.findByUserId(tailorId).ifPresent(profile -> {
            profile.setRating(avgRating);
            profile.setTotalRatings(ratings.size());
            tailorProfileRepository.save(profile);
        });
    }
    
    public PaymentRequest createPaymentRequest(PaymentRequest paymentRequest) {
        paymentRequest.setRequestedAt(LocalDateTime.now());
        paymentRequest.setStatus(PaymentRequest.PaymentStatus.PENDING);
        return paymentRequestRepository.save(paymentRequest);
    }
    
    public List<PaymentRequest> getCustomerPaymentRequests(Long customerId) {
        return paymentRequestRepository.findByCustomerId(customerId);
    }
    
    public PaymentRequest markPaymentAsPaid(Long paymentId) {
        PaymentRequest payment = paymentRequestRepository.findById(paymentId).orElseThrow();
        payment.setStatus(PaymentRequest.PaymentStatus.PAID);
        payment.setPaidAt(LocalDateTime.now());
        return paymentRequestRepository.save(payment);
    }
    

}
