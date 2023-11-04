package com.bloggy.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bloggy.backend.repositories.CommentRepository;
import com.bloggy.backend.entites.*;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CommentService {
	private CommentRepository commentrepo;
	
	
	public List<Comments> getComments(String auth){
		return commentrepo.findByAuthor(auth);
	}
	
	public void delete(long id){
		commentrepo.deleteById(id);
	}
}
