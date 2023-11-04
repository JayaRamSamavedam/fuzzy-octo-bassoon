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


@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
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
	String content;
	@Column(name="approved",nullable=false)
	int approved;
	@Column(name="type",nullable=true)
	String type;
//	public Posts(long id, long likes, String author, @Size(max = 10) String img, @Size(max = 50) String title,
//			String content, int approved) {
//		super();
//		this.id = id;
//		this.likes = likes;
//		this.author = author;
//		this.img = img;
//		this.title = title;
//		this.content = content;
//		this.approved = approved;
//	}
//	
//	public Posts() {}
}
