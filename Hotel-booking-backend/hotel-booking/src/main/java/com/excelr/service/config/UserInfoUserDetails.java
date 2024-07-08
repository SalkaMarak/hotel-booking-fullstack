package com.excelr.service.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.excelr.entity.User;

import java.util.Collection;
import java.util.List;

public class UserInfoUserDetails implements UserDetails {
    private User user;
    
    public UserInfoUserDetails(User user) {
        this.user = user;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority sga = new SimpleGrantedAuthority(user.getRole());
        return List.of(sga);
    }
    
    @Override
    public String getPassword() {
        return user.getPassword();
    }
    
    @Override
    public String getUsername() {
        return user.getName();
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}


//an implementation of the UserDetails interface. This class adapts your UserInfo entity to the UserDetails interface required by Spring Security for authentication and authorization.

/*
 Key Responsibilities:

Get Authorities: Returns the roles or authorities of the user.
Get Password: Returns the encoded password of the user.
Get Username: Returns the username (or in this case, the name) of the user.
 */