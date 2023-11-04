package com.bloggy.backend.repositories;

import com.bloggy.backend.entites.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comments,Long>{
	public List<Comments> findByAuthor(String author);
}
