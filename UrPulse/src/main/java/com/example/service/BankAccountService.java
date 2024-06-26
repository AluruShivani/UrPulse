package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.entity.BankAccount;
@Service
public interface BankAccountService {
	 BankAccount createBankAccount(BankAccount bankaccount);
	    Optional<BankAccount> getBankAccountById(long id);
	    List<BankAccount> getAllBankAccounts();
	    void deleteBankAccountById(long id);
	    boolean isBankAccountExits(long id);
	    boolean updateBankAccount(BankAccount bankaccount);
	    List<BankAccount> getBankAccountsByUserId(Long userId);

}
