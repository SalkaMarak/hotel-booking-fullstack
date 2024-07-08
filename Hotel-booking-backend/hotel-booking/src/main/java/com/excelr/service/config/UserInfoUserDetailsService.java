package com.excelr.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.excelr.dao.UserRepository;
import com.excelr.entity.User;

public class UserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User result = userRepo.findByName(username);
        if (result == null) {
            throw new UsernameNotFoundException(username + " user not found.");
        }
        // Pass UserInfo including role to UserDetails implementation
        UserInfoUserDetails userDetails = new UserInfoUserDetails(result);
        return userDetails;
    }
}


// implements the UserDetailsService interface. It is used by Spring Security to load user-specific data during the authentication process.

/*
 Key Responsibilities:

Load User by Username: This method fetches the user details from the database based on the username (or name) and returns a UserInfoUserDetails object.
 */

//=====================================================

//this layer will interact with the database if the data is valid or nah.

//immediately after the login page is entered this method is called loadUserByUsername and based on the username an object is fetched if not present, exception, if present we pass it to UserInfoUserDetails class where we configure the roles passwords and stuff.
