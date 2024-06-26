package com.example.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Payment;
import com.example.repository.PaymentsRepository;
import com.example.service.PaymentsService;
@Service
public class PaymentsServiceImpl implements PaymentsService{
	@Autowired
	private PaymentsRepository paymentRepository;

	@Override
	public Payment createPayments(Payment payment) {
		return paymentRepository.save(payment);
	}

	@Override
	public Optional<Payment> getPaymentById(long paymentId) {
		return paymentRepository.findById(paymentId);
	}

	@Override
	public List<Payment> getAllPayments() {
		return paymentRepository.findAll();
	}

	@Override
	public void deletePaymentById(long paymentId) {
		paymentRepository.deleteById(paymentId);
		
	}

	@Override
	public boolean isPaymentsExits(long paymentId) {
		return paymentRepository.existsById(paymentId);
	}

	@Override
	public boolean updatePayments(Payment payment) {
		if(isPaymentsExits(payment.getPaymentId())) {
			paymentRepository.save(payment);
			return true;
		}
		return false;

	}
	
	

}
