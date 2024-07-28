package com.excelr.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.excelr.dao.UserRepository;
import com.excelr.entity.User;

@Service
public class UserInfoService {
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private PasswordEncoder pw;
    
    private static final String DEFAULT_ROLE = "ROLE_USER";
    
    public String insertUserInfo(User u) {
        u.setPassword(pw.encode(u.getPassword()));
        u.setRole(DEFAULT_ROLE);  
        userRepo.save(u);
        return "User added successfully to the db";
    }
    
    public String insertUserInfo(User u, String role) {
        u.setPassword(pw.encode(u.getPassword()));
        u.setRole(role);  
        userRepo.save(u);
        return "User added successfully to the db with role: " + role;
    }
}
