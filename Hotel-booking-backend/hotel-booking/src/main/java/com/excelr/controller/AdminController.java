package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.excelr.entity.Admin;
import com.excelr.service.AdminService;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        Optional<Admin> existingAdmin = adminService.findByEmail(admin.getEmail());
        if (existingAdmin.isPresent() && passwordEncoder.matches(admin.getPassword(), existingAdmin.get().getPassword())) {
            return ResponseEntity.ok(existingAdmin.get());
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Admin admin) {
        adminService.saveAdmin(admin);
        return ResponseEntity.ok("Admin registered successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable int id, @RequestBody Admin admin) {
        Optional<Admin> updatedAdmin = adminService.updateAdmin(id, admin);
        return updatedAdmin.map(value -> ResponseEntity.ok("Admin updated successfully"))
                              .orElseGet(() -> ResponseEntity.status(404).body("Admin not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable int id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok("Admin deleted successfully");
    }
}
