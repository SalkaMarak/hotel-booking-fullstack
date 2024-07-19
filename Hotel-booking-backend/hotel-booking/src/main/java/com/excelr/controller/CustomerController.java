package com.excelr.controller;

import com.excelr.entity.Customer;
import com.excelr.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Customer customer) {
        Optional<Customer> existingCustomer = customerService.findByEmail(customer.getEmail());
        if (existingCustomer.isPresent() && passwordEncoder.matches(customer.getPassword(), existingCustomer.get().getPassword())) {
            return ResponseEntity.ok(existingCustomer.get());
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) {
        customerService.saveCustomer(customer);
        return ResponseEntity.ok("Customer registered successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
        Optional<Customer> updatedCustomer = customerService.updateCustomer(id, customer);
        return updatedCustomer.map(value -> ResponseEntity.ok("Customer updated successfully"))
                              .orElseGet(() -> ResponseEntity.status(404).body("Customer not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted successfully");
    }
}
