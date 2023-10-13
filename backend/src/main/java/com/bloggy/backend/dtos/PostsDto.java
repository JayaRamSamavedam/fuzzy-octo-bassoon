package com.bloggy.backend.dtos;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostsDto {
	long id;
	long likes;
	String author;
	String img;
	String title;
	String content;
}
