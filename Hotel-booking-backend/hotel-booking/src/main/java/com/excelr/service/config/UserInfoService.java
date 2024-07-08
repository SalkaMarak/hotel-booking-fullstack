//this is for adding the users
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
}


/* this is a service layer component responsible for managing user information, particularly handling user registration and password encoding.


	Key Responsibilities:

-Insert UserInfo: The insertUserInfo method saves a new user to the database after encoding the password.


========================

 Integration and Flow: of these three classes
1. User Registration:
		-When a new user registers, the UserInfoService is used to save the user information in the database with an encoded password.

2. User Authentication:
		-During the authentication process, Spring Security uses the UserInfoUserDetailsService to load user details based on the username provided.
		-UserInfoUserDetailsService fetches the UserInfo from the database and adapts it to a UserInfoUserDetails object.
		-Spring Security then uses the UserInfoUserDetails object to check the user's credentials and authorities.

*By organizing these classes in this way, you separate concerns effectively:
		-UserInfoService handles user data management.
		-UserInfoUserDetails adapts your entity to Spring Security's UserDetails.
		-UserInfoUserDetailsService integrates with Spring Security to fetch user details for authentication.
 
 */