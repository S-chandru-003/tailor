package com.tailor.controller;

import com.tailor.dto.TailorSearchDTO;
import com.tailor.model.*;
import com.tailor.repository.OrderRepository;
import com.tailor.service.TailorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tailors")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class TailorController {
    private final TailorService tailorService;
    private final OrderRepository orderRepository;
    
    @GetMapping("/search")
    public ResponseEntity<List<TailorSearchDTO>> searchByCity(@RequestParam String city) {
        return ResponseEntity.ok(tailorService.searchTailorsByCity(city));
    }
    
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return ResponseEntity.ok(tailorService.createOrder(order));
    }
    
    @GetMapping("/orders/customer/{customerId}")
    public ResponseEntity<List<Order>> getCustomerOrders(@PathVariable Long customerId) {
        return ResponseEntity.ok(orderRepository.findByCustomerId(customerId));
    }
    
    @GetMapping("/orders/tailor/{tailorId}")
    public ResponseEntity<List<Order>> getTailorOrders(@PathVariable Long tailorId) {
        return ResponseEntity.ok(orderRepository.findByTailorId(tailorId));
    }
    
    @PutMapping("/orders/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long orderId, @RequestBody Order order) {
        return ResponseEntity.ok(tailorService.updateOrder(orderId, order));
    }
    
    @PostMapping("/messages")
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        return ResponseEntity.ok(tailorService.sendMessage(message));
    }
    
    @GetMapping("/messages/{orderId}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Long orderId) {
        return ResponseEntity.ok(tailorService.getOrderMessages(orderId));
    }
    
    @PostMapping("/ratings")
    public ResponseEntity<Rating> addRating(@RequestBody Rating rating) {
        return ResponseEntity.ok(tailorService.addRating(rating));
    }
    
    @PostMapping("/payment-requests")
    public ResponseEntity<PaymentRequest> createPaymentRequest(@RequestBody PaymentRequest paymentRequest) {
        return ResponseEntity.ok(tailorService.createPaymentRequest(paymentRequest));
    }
    
    @GetMapping("/payment-requests/customer/{customerId}")
    public ResponseEntity<List<PaymentRequest>> getCustomerPaymentRequests(@PathVariable Long customerId) {
        return ResponseEntity.ok(tailorService.getCustomerPaymentRequests(customerId));
    }
    
    @PutMapping("/payment-requests/{paymentId}/pay")
    public ResponseEntity<PaymentRequest> markPaymentAsPaid(@PathVariable Long paymentId) {
        return ResponseEntity.ok(tailorService.markPaymentAsPaid(paymentId));
    }
}
