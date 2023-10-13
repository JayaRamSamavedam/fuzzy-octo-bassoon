package com.bloggy.backend.entites;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "app_posts")
public class Posts {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	@Column(name="likes",nullable = true)
	long likes;
	@Column(name="author",nullable = false)
	String author;
	@Column(name="img",nullable=true)
	@Size(max = 10)
	String img;
	@Column(name="title",nullable=false)
	@Size(max=50)
	String title;
	@Column(name="content",nullable=false)
	@Size(max=5000)
	String content;
}
