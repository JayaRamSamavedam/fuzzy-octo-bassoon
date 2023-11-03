import React, { useState } from "react";
import axios from "axios";
import JoditEditor from 'jodit-react';
import { useNavigate, useLocation } from "react-router-dom";

const Up = () => {
  const location = useLocation();
  const p = location.state;
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState(p.content || "");

  // Initialize post state with default values
  const [post, setPost] = useState(p || {
    id: 0,
    title: "",
    content: "",
    author: "",
    image: null,
    approved:0,
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
    try {
        const response = await axios.put(`http://localhost:1593/posts/update`, post.data, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
          },
        });
        console.log('Response:', response);
      

      console.log('Post updated:', response.data);

      if (post.image) {
        // Step 2: Upload the image if it's provided
        const imageFormData = new FormData();
        imageFormData.append('image', post.image);

        const imageResponse = await axios.post(`http://localhost:1593/post/image/upload/${response.data.id}`, imageFormData, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
            'Content-Type': 'multipart/form-data', // Required for file upload
          },
        });

        console.log('Image uploaded:', imageResponse);
      }

      // Optionally, you can clear the form fields
      navigate('/posts');
    } catch (error) {
      // Handle errors
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <div className="text-4xl font-sans font-extrabold">Update Post</div>
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
          onChange={(newContent) => setEditorContent(newContent)}
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
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default Up;
