package com.bloggy.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bloggy.backend.entites.Posts;


public interface PostsRepository extends JpaRepository<Posts,Long>{

}
