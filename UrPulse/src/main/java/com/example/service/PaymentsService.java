package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.example.entity.Payment;
@Service
public interface PaymentsService {
	Payment createPayments(Payment payment);
	Optional<Payment> getPaymentById(long paymentId);
	List<Payment> getAllPayments();
	void deletePaymentById(long paymentId);
	boolean isPaymentsExits(long paymentId);
	boolean updatePayments(Payment payment);
}
