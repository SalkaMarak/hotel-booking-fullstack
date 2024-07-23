package com.excelr.service;

import com.excelr.entity.Admin;
import com.excelr.dao.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public void saveAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
    }

    public Optional<Admin> updateAdmin(int id, Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findById(id);
        if (existingAdmin.isPresent()) {
            Admin updateAdmin = existingAdmin.get();
            updateAdmin.setName(admin.getName());
            updateAdmin.setEmail(admin.getEmail());
            // Encode the password if it's being updated
            updateAdmin.setPassword(passwordEncoder.encode(admin.getPassword()));
            adminRepository.save(updateAdmin);
            return Optional.of(updateAdmin);
        } else {
            return Optional.empty();
        }
    }

    public void deleteAdmin(int id) {
        adminRepository.deleteById(id);
    }
}
