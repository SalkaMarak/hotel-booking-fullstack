package com.excelr.service;

import com.excelr.entity.Customer;
import com.excelr.dao.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Customer> findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public void saveCustomer(Customer customer) {
        // Encode the password before saving
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customerRepository.save(customer);
    }

    public Optional<Customer> updateCustomer(int id, Customer customer) {
        Optional<Customer> existingCustomer = customerRepository.findById(id);
        if (existingCustomer.isPresent()) {
            Customer updateCustomer = existingCustomer.get();
            updateCustomer.setName(customer.getName());
            updateCustomer.setEmail(customer.getEmail());
            // Encode the password if it's being updated
            updateCustomer.setPassword(passwordEncoder.encode(customer.getPassword()));
            customerRepository.save(updateCustomer);
            return Optional.of(updateCustomer);
        } else {
            return Optional.empty();
        }
    }

    public void deleteCustomer(int id) {
        customerRepository.deleteById(id);
    }
}
