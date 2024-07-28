package com.excelr.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.excelr.dao.UserRepository;
import com.excelr.entity.User;

@Service
public class UserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User result = userRepo.findByName(username);
        if (result == null) {
            throw new UsernameNotFoundException(username + " user not found.");
        }
        return new UserInfoUserDetails(result);
    }
}
