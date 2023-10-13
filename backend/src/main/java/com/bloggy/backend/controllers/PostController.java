package com.bloggy.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.bloggy.backend.config.UserAuthenticationProvider;
import com.bloggy.backend.entites.*;
import com.bloggy.backend.repositories.*;
import com.bloggy.backend.services.UserService;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class PostController {
	
	
	PostsRepository pr;
	
//	to get all the posts
	@GetMapping("/posts")
	public List<Posts> getAll(@RequestHeader String token,HttpServletResponse response){
		if(token==null) {
			response.setStatus(404);
			return null;
		}
		else {
			String act=token.substring(7);
			
		}
		return pr.findAll();
	}
	
	

}
