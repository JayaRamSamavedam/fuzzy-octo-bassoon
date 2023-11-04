package com.bloggy.backend.controllers;


import com.bloggy.backend.EmailDetails;
import com.bloggy.backend.EmailService;
import com.bloggy.backend.config.UserAuthenticationProvider;
import com.bloggy.backend.dtos.CredentialsDto;
import com.bloggy.backend.dtos.SignUpDto;
import com.bloggy.backend.dtos.UserDto;
import com.bloggy.backend.services.UserService;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;
    private final EmailService emailService;
	@PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getLogin()));
        try {
        	EmailDetails details = new EmailDetails();
        	details.setRecipient(userDto.getEmail());
        	details.setSubject("Attention required");
        	details.setMsgBody("We found a new login if not made by you please reach out to 2100031593@kluniversity "+userDto.getFirstName());
        	String status
            = emailService.sendSimpleMail(details);
        }
        finally {
        
        }
        return ResponseEntity.ok(userDto);
    }
	
	 @PostMapping("/sendMail")
	    public String
	    sendMail(@RequestBody EmailDetails details)
	    {
	        String status
	            = emailService.sendSimpleMail(details);
	 
	        return status;
	    }
	
    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid SignUpDto user) {
        UserDto createdUser = userService.register(user);
        createdUser.setToken(userAuthenticationProvider.createToken(user.getLogin()));
        try {
        	EmailDetails details = new EmailDetails();
        	details.setRecipient(createdUser.getEmail());
        	details.setSubject("welcome to blogy");
        	details.setMsgBody("We are Most awaited for you "+createdUser.getFirstName());
        	String status
            = emailService.sendSimpleMail(details);
        }
        finally {
        	
        }
        return ResponseEntity.ok(createdUser);
    }
    
    @GetMapping("/user")
    public String isValid(@RequestHeader(name="Authorization") String token,HttpServletResponse response) {
    	String inputtoken = token.substring(7);
    	response.setStatus(200);
    	return userAuthenticationProvider.validateToken(inputtoken).getName();
    }

}