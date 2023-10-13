package com.bloggy.backend.mappers;

import org.mapstruct.Mapper;

import com.bloggy.backend.dtos.PostsDto;
import com.bloggy.backend.entites.*;
@Mapper(componentModel = "spring")
public class PostMapper {
	
	
	public static PostsDto mapToPostsDto(Posts Posts){
        PostsDto PostsDto = new PostsDto(
                Posts.getId(),
                Posts.getLikes(),
                Posts.getAuthor(),
                Posts.getImg(),
                Posts.getTitle(),
                Posts.getContent()
        );
        return PostsDto;
    }

    // Convert PostsDto into Posts JPA Entity
    public static Posts mapToPosts(PostsDto Posts){
        Posts p = new Posts(
        		Posts.getId(),
                Posts.getLikes(),
                Posts.getAuthor(),
                Posts.getImg(),
                Posts.getTitle(),
                Posts.getContent()
        );
        return p;
    }
}
