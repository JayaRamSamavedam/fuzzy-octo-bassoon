import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import JoditEditor from 'jodit-react';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const [user, setUser] = useState(null);
  const options = ["blog", "vlog"];
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const getUserFromLocalStorage = () => {
    const userString = window.localStorage.getItem("user");
    if (userString) {
      const userObject = JSON.parse(userString);
      setUser(userObject);
      console.log(userObject);
    }
  };

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState("");
  const contentFieldChanged = (data) => {
    setEditorContent(data);
  };

  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
    type: "",
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

    const imageFormData = new FormData();
    imageFormData.append("image", post.image);

    const postFormData = new FormData();
    postFormData.append("title", post.title);
    postFormData.append("content", editorContent);
    postFormData.append("author", user.username);
    postFormData.append("img", "image");
    postFormData.append("type", selectedOption);

    try {
      const postResponse = await axios.post("http://localhost:8888/posts/add", postFormData, {
        headers: {
          "Authorization": `Bearer ${window.localStorage.getItem("auth_token")}`,
        },
      });

      console.log("Post created:", postResponse.data);

      try {
        const imageResponse = await axios.post(`http://localhost:1593/post/image/upload/${postResponse.data.id}`, imageFormData, {
          headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("auth_token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(imageResponse);

        setPost({
          title: "",
          content: "",
          author: "",
          image: null,
        });

        navigate("/posts");
      } catch (imageError) {
        console.error("Error uploading image:", imageError);
        toast.error("Image upload failed. Please try again.");
      }
    } catch (postError) {
      console.error("Error creating post:", postError);
      toast.error("Failed to create the post. Server is not working.");
    }
  };

  return (
    <>
      <div className="text-4xl font-serif font-bold">Create a New Post</div>
      <div className="card mb-3 left-24 top-10" style={{ "maxWidth": "1200px" }}>
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
          <div>
            <h2>Select Your Option</h2>
            <ul>
              {options.map((option) => (
                <li key={option}>
                  <label>
                    <input
                      type="radio"
                      name="options"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionChange(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            <h3>Selected Option:</h3>
            <p>{selectedOption}</p>
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
