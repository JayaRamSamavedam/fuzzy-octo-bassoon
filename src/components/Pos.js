import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ImageComponent from './DisplayImage';
import { json, useLocation, useNavigate } from 'react-router-dom';
import { Request } from '../helper/axios_helper';
import UpdatePost from './up';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pos = () => {
    const[update,setUpdate]=useState(null);
    const navigate = useNavigate("");
    const [data, setData] = useState({});
    const location = useLocation();
    const postData = location.state;
    useEffect(() => {
        axios.get(`http://localhost:1593/posts/${postData.id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching post:', error);
        });
    }, [postData.id]);
    console.log(data.img)
    const handleDelete = async () => {
        // Retrieve the user object from local storage and parse it as JSON
        const storedUser = JSON.parse(window.localStorage.getItem("user"));
    
        console.log(storedUser.username === "admin");
        console.log(storedUser.username === data.author);
        console.log(storedUser);
        console.log(data.author);
    
        if (storedUser.username === "admin" || storedUser.username === data.author) {
            const res = Request("DELETE", `/posts/delete/${postData.id}`, {});
            console.log(res);
            navigate("/posts");
        }
        else{
            toast.error("you have no acess to do it");
        }
    }
    const handleShare = () => {
        const shareData = {
            title: data.title,
            text: data.content,
            url: window.location.href,
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Share failed:', error));
        } else {
            alert('Sharing is not supported on this browser.');
        }
    };
    const handleUpdate=()=>{
        const storedUser = JSON.parse(window.localStorage.getItem("user"));
    
        console.log(storedUser.username === "admin");
        console.log(storedUser.username === data.author);
        console.log(storedUser);
        console.log(data.author);
    
        if (storedUser.username === "admin" || storedUser.username === data.author) {
  
        setUpdate(data);
        navigate("/update",{state:{data}})
        }
        else{
            toast.error("you are not allowed to do this")
        }
    }
    if(data.img!=null){
    return (
        <div class="md:container md:mx-auto align-middle justify-center">
            <p>Title: {data.title}</p>
             {/* <ImageComponent imagename={data.img}/> */}
            <p>Author: {data.author}</p>
            <p>Likes: {data.likes}</p>
            <div className="content-output">
        <h2>Content Output</h2>
        <div dangerouslySetInnerHTML={{ __html:data.content}}></div>
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleShare}>Share</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleDelete}>Delete me</button>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleUpdate}>Update</button>
      <ToastContainer />
        </div>
        
    );}
    else{
        return(
            <>
            <p>Author: {data.author}</p>
            <p>Title: {data.title}</p>
            <p>Content: {data.content}</p>
            <p>Likes: {data.likes}</p>
            <ToastContainer />
            </>
        )
    }
}

export default Pos;