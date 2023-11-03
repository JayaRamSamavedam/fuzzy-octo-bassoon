import React, { useState } from "react";
import axios from "axios";
import Appbar from "./NavBar";
// import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const user =window.localStorage.getItem("user");
  console.log(user);
  const navigate=useNavigate("");
  const [editorContent, setEditorContent] = useState('');
  const contentFieldChanged = (data) => {
    setEditorContent(data);
  };
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setPost({
      ...post,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // Step 1: Upload the image
    const imageFormData = new FormData();
    imageFormData.append("image", post.image);

    // const imageFileName = imageResponse.data;
      
    // Step 2: Create the post with the image file name
    const postFormData = new FormData();
    postFormData.append("title", post.title);
    postFormData.append("content", editorContent);
    postFormData.append("author", post.author);
    postFormData.append("img", "image"); // Reference to the uploaded image
      
    const postResponse = await axios.post("http://localhost:1593/posts/add", postFormData, {
      headers: {
        "Authorization":`Bearer ${window.localStorage.getItem("auth_token")}`,
        // "Content-Type": "multipart/form-data", // Required for file upload
      },
    });
    console.log("Post created:", postResponse.data);
    try {
      const imageResponse = await axios.post(`http://localhost:1593/post/image/upload/${postResponse.data.id}`, imageFormData, {
        headers: {
          "Authorization":`Bearer ${window.localStorage.getItem("auth_token")}`,
          "Content-Type": "multipart/form-data", // Required for file upload
        },
      });
      console.log(imageResponse);
      // Get the uploaded image file name from the response
     
  
      // Check the response or perform any other action after creating the post.
      
  
      // Optionally, you can clear the form fields
      setPost({
        title: "",
        content: "",
        author: "",
        image: null,
      }
      
      ); 
      navigate("/posts");
    } catch (error) {
      // Handle errors
      console.error("Error creating post:", error);
    }
  };
  

  return (
    <div>
    {/* <Appbar/> */}
      <div className="text-4xl font-serif font-bold">Create a New Post</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleInputChange}
        />
        <JoditEditor
        value={editorContent}
        onChange={(newContent) => contentFieldChanged(newContent)}
      />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={post.author}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
