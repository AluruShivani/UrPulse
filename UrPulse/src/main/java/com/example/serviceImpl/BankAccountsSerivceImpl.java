package com.example.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.BankAccount;
import com.example.repository.BankAccountsRepository;
import com.example.service.BankAccountService;

@Service
public class BankAccountsSerivceImpl implements BankAccountService{
	
	@Autowired
	private BankAccountsRepository bankaccountsRepository;

	@Override
	public BankAccount createBankAccount(BankAccount bankaccount) {
		return bankaccountsRepository.save(bankaccount);
	}

	@Override
	public Optional<BankAccount> getBankAccountById(long id) {
		return bankaccountsRepository.findById(id);
	}

	@Override
	public List<BankAccount> getAllBankAccounts() {
		return bankaccountsRepository.findAll();
	}

	@Override
	public void deleteBankAccountById(long id) {
		bankaccountsRepository.deleteById(id);
		
	}

	@Override
	public boolean isBankAccountExits(long id) {
		return bankaccountsRepository.existsById(id);
	}

	@Override
	public boolean updateBankAccount(BankAccount bankaccount) {
		if(isBankAccountExits(bankaccount.getId())) {
			bankaccountsRepository.save(bankaccount);
			return true;
		}
		return false;
	}

	@Override
	public List<BankAccount> getBankAccountsByUserId(Long userId) {
		 return bankaccountsRepository.findByUserId(userId);
	}
	
	

}
