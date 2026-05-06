package com.tailor.repository;

import com.tailor.model.PaymentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRequestRepository extends JpaRepository<PaymentRequest, Long> {
    List<PaymentRequest> findByOrderId(Long orderId);
    List<PaymentRequest> findByCustomerId(Long customerId);
    List<PaymentRequest> findByTailorId(Long tailorId);
}
