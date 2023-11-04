package com.bloggy.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.data.util.StreamUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.service.annotation.DeleteExchange;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import com.bloggy.backend.config.UserAuthenticationProvider;
import com.bloggy.backend.dtos.PostsDto;
import com.bloggy.backend.entites.*;
import com.bloggy.backend.repositories.*;
import com.bloggy.backend.services.FileService;
import com.bloggy.backend.services.PostsService;
import com.bloggy.backend.services.UserService;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@RestController
public class PostController {
//	 	@Value("${upload-dir}") // Define the upload directory in your application.properties or application.yml
//	    private String uploadDir;
	@Value("${project.image}")
	private String path;

	@Autowired
	private FileService fileService;
	
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
				List<PostsDto> posts = ps.getblogs();
				return new ResponseEntity<>(posts,HttpStatus.OK);
			}
			else {
				response.setStatus(420);
				return null;
			}
		}
	}
	
	@GetMapping("/vlogs")
	public ResponseEntity<List<PostsDto>> getVlogs(@RequestHeader("Authorization") String token,HttpServletResponse response){
		if(token==null) {
			response.setStatus(404);
			return null;
		}
		else {
			String act=token.substring(7);
			if(userAuthenticationProvider.validateToken(act).isAuthenticated()) {
				List<PostsDto> posts = ps.getvlogs();
				return new ResponseEntity<>(posts,HttpStatus.OK);
			}
			else {
				response.setStatus(420);
				return null;
			}
		}
	}
	
	@PostMapping("/posts/add")
	public ResponseEntity<PostsDto> createPost(@RequestHeader("Authorization")String token ,@RequestBody @Valid PostsDto pd){
		if(token==null) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
		else {
//		System.out.print("I got invoked");
			if(userAuthenticationProvider.validateToken(token.substring(7)).isAuthenticated()) {
			PostsDto saved = ps.createPosts(pd);
			saved.setApproved(0);
			return new ResponseEntity<>(saved,HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
			}
		}
		
	}
	
	@PutMapping("/posts/update")
	public ResponseEntity<PostsDto> updatePost(@RequestHeader("Authorization") String token,@RequestBody PostsDto pd){
		System.out.println("I am invoked");
		System.out.println(pd);
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
//	@PostMapping("/api/posts/uploadImage")
//	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
//	    if (file.isEmpty()) {
//	        return ResponseEntity.badRequest().body("Please select a file to upload.");
//	    }
//
//	    try {
//	        // Get the Tomcat base directory
//	        String tomcatBaseDir = System.getProperty("catalina.base");
//
//	        // Construct the absolute path
//	        String filePath = tomcatBaseDir + File.separator + "webapps" + File.separator + "ROOT" + File.separator + "images" + File.separator + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
//
//	        // Save the file to the specified location
//	        File destinationFile = new File(filePath);
//	        file.transferTo(destinationFile);
//
//	        return ResponseEntity.ok(destinationFile.getName());
//	    } catch (IOException e) {
//	        e.printStackTrace();
//	        return ResponseEntity.status(500).body("Failed to upload the file.");
//	    }
//	}
//	@PostMapping("/api/posts/uploadImage")
//	public String uploadImage(String path, MultipartFile file) throws IOException {
//
//		// File name
//		String name = file.getOriginalFilename();
//		// abc.png
//
//		// random name generate file
//		String randomID = UUID.randomUUID().toString();
//		String fileName1 = randomID.concat(name.substring(name.lastIndexOf(".")));
//
//		// Full path
//		String filePath = path;
//
//		// create folder if not created
//		File f = new File(path);
//		if (!f.exists()) {
//			f.mkdir();
//		}
//
//		// file copy
//
//		Files.copy(file.getInputStream(), Paths.get("images/"+fileName1));
//
//		return fileName1;
//	}
//	 @GetMapping(value = "/post/image/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
//	    public void downloadImage(
//	            @PathVariable("imageName") String imageName,
//	            HttpServletResponse response
//	    ) throws IOException {
//
//	        InputStream resource = this.fileService.getResource(path, imageName);
//	        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
//	        StreamUtils.copy(resource,response.getOutputStream())   ;
//
//	    }

	@PostMapping("/post/image/upload/{postId}")
	public ResponseEntity<PostsDto> uploadPostImage(@RequestParam("image") MultipartFile image,
			@PathVariable Long postId) throws IOException {

		PostsDto postDto = this.ps.getpost(postId);
		
		String fileName = this.fileService.uploadImage(path, image);
		postDto.setImg(fileName);
	
		PostsDto updatePost = this.ps.updatePost(postDto);
		return new ResponseEntity<PostsDto>(updatePost, HttpStatus.OK);

	}
	

    //method to serve files
    @GetMapping(value = "/post/image/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(
    
            @PathVariable("imageName") String imageName,
            HttpServletResponse response
    ) throws IOException {
		System.out.print(imageName);
        InputStream resource = this.fileService.getResource(path, imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource,response.getOutputStream())   ;

    }    
}
