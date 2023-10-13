package com.bloggy.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bloggy.backend.dtos.PostsDto;
import com.bloggy.backend.entites.Posts;
import com.bloggy.backend.mappers.PostMapper;
import com.bloggy.backend.repositories.PostsRepository;

import lombok.RequiredArgsConstructor;

//@RequiredArgsConstructor
@Service
public class PostsService {
	private PostsRepository pr;
	
public PostsService(PostsRepository pr) {
		super();
		this.pr = pr;
	}
	//	create
	public PostsDto createPosts(PostsDto pd) {
//		convert to posts dto to jpa entity
		Posts p = PostMapper.mapToPosts(pd);
		
		Posts savedp = pr.save(p);
		
		PostsDto saveddto = PostMapper.mapToPostsDto(savedp);
		
		return saveddto;
	}
//	getall
	 public List<PostsDto> getAllUsers() {
	        List<Posts> users = pr.findAll();
	        return users.stream().map(PostMapper::mapToPostsDto)
	                .collect(Collectors.toList());
	    }
//	update
	 public PostsDto updatePost(PostsDto post) {
		 Posts existingpost = pr.findById(post.getId()).get();
		 existingpost.setAuthor(post.getAuthor());
		 existingpost.setContent(post.getContent());
		 existingpost.setImg(post.getImg());
		 existingpost.setLikes(post.getLikes());
		 existingpost.setTitle(post.getTitle());
		 Posts updatepost = pr.save(existingpost);
		 
		 return PostMapper.mapToPostsDto(updatepost);
	 }
	 
//	 delete
	 public void deletepost(Long pid) {
		 pr.deleteById(pid);
	 }
	 
//	 get post by id
	 
	 public PostsDto getpost(Long id) {
		 Posts p = pr.findById(id).get();
		 return PostMapper.mapToPostsDto(p);
	 }
}
