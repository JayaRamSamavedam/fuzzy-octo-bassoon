package com.bloggy.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bloggy.backend.entites.Posts;


public interface PostsRepository extends JpaRepository<Posts,Long>{
	List<Posts> findByApproved(int approved);
}
