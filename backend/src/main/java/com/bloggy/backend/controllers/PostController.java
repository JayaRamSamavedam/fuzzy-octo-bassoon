package com.bloggy.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.DeleteExchange;

import java.util.List;

import com.bloggy.backend.config.UserAuthenticationProvider;
import com.bloggy.backend.dtos.PostsDto;
import com.bloggy.backend.entites.*;
import com.bloggy.backend.repositories.*;
import com.bloggy.backend.services.PostsService;
import com.bloggy.backend.services.UserService;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class PostController {
	
	
//	PostsRepository pr;
	private final UserAuthenticationProvider userAuthenticationProvider;
	private final PostsService ps;
//	to get all the posts
	@GetMapping("/posts")
	public ResponseEntity<List<PostsDto>> getAll(@RequestHeader("Authorization") String token,HttpServletResponse response){
		if(token==null) {
			response.setStatus(404);
			return null;
		}
		else {
			String act=token.substring(7);
			if(userAuthenticationProvider.validateToken(act).isAuthenticated()) {
				List<PostsDto> posts = ps.getAllUsers();
				return new ResponseEntity<>(posts,HttpStatus.OK);
			}
			else {
				response.setStatus(420);
				return null;
			}
		}
	}
	
	@PostMapping("/posts/add")
	public ResponseEntity<PostsDto> createPost(@RequestHeader("Authorization") String token,@RequestBody PostsDto pd){
		if(token==null) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
		else {
			PostsDto saved = ps.createPosts(pd);
			return new ResponseEntity<>(saved,HttpStatus.CREATED);
		}
	}
	
	@PutMapping("/posts/update")
	public ResponseEntity<PostsDto> updatePost(@RequestHeader("Authorization") String token,@RequestBody PostsDto pd){
		if(token==null) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
		else {
			String act=token.substring(7);
			if(userAuthenticationProvider.validateToken(act).isAuthenticated()) {
				
			
			pd.setId(pd.getId());
			PostsDto updated= ps.updatePost(pd);
			return new ResponseEntity<>(updated,HttpStatus.OK);
			}
			else{
				return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
			}
		}
	}
	
	@GetMapping("/posts/{id}")
	public ResponseEntity<PostsDto> getpost(@RequestHeader("Authorization") String token,@PathVariable("id") Long pid){
		if(token==null) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
		else {
			String act=token.substring(7);
			if(userAuthenticationProvider.validateToken(act).isAuthenticated()) {
				
			 PostsDto pd = ps.getpost(pid);
			 return new ResponseEntity<>(pd,HttpStatus.OK);
			}
			else{
				return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
			}
		}
//		return null;3
	}
	
	@DeleteMapping("/posts/delete/{id}")
	public ResponseEntity<String> deletedPost(@RequestHeader("Authorization") String token,@PathVariable("id") Long pid){
		if(token==null) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
		else {
			String act=token.substring(7);
			if(userAuthenticationProvider.validateToken(act).isAuthenticated()) {
		ps.deletepost(pid);
		return new ResponseEntity<>("user suceesfully deleted!",HttpStatus.OK);
			}
			else{
				return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
			}
		}
	}
	

}
