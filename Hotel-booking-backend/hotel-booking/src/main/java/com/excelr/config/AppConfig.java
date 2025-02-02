package com.excelr.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import com.excelr.service.config.UserInfoUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AppConfig {

    @Bean
    public UserDetailsService userDetServ() {
        return new UserInfoUserDetailsService();
    }

    @Bean
    public PasswordEncoder encode() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider provider() {
        DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
        dao.setUserDetailsService(userDetServ());
        dao.setPasswordEncoder(encode());
        return dao;
    }

    @Bean
    public SecurityFilterChain filter(HttpSecurity http) throws Exception {
    	/*
    	  return http
	            .csrf().disable()
	            .authorizeHttpRequests()
	                .requestMatchers("/api/hotels/hotel/input", "/api/users/user/{id}", "/api/user/register", "/api/hotels/welcome")
	                .permitAll()
	                .requestMatchers("/api/hotels/{id}", "/api/bookings/all", "/api/rooms/{id}")
	                .hasRole("admin")
	                .anyRequest()
	                .authenticated()
	                .and()
	            .formLogin().and()
	            .build();
    	*/
    	
        http.csrf().disable() 
            .authorizeRequests()
            .anyRequest().permitAll();

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

