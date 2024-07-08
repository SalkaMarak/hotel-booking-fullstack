package com.excelr.service;

import com.excelr.entity.User;
import com.excelr.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder pw;

    public List<User> getAllCustomers() {
        return userRepository.findAll();
    }

    public User getCustomerById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User saveCustomer(User u) {
    	u.setPassword(pw.encode(u.getPassword()));
        u.setRole("ROLE_USER");
        userRepository.save(u);
        return userRepository.save(u);
    }

    public void deleteCustomer(Long id) {
        userRepository.deleteById(id);
    }
}

