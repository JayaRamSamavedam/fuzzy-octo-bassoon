import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageComponent from './DisplayImage';
import { useNavigate } from 'react-router-dom'
export const AllPOsts = () => {
  
  const [data, setData] = useState([]);
  const navigate=useNavigate("");
  const handleClick = (id) => {
    navigate('/pos', { state: { id: id } });
  }
  useEffect(() => {
    axios.get('http://localhost:8888/posts', {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  console.log(data);
  const getImage = async (imageName) => {
    try {
      const response = await axios.get(`http://localhost:1593/post/image/${imageName}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`,
        },
        responseType: 'arraybuffer',
      });
  
      if (response.status === 200) {
        const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(imageBlob);
        console.log('Image URL:', imageUrl);
        return imageUrl;
      } else {
        console.error('Image request failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };
  

  return (
    // <div className='surya' style={{"justifyContent": "center","align-items": "center","height":"100vh"}}>
    <div class="md:container md:mx-auto align-middle justify-center " >
      {data.map((item, index) => (
        <div key={index} >
          <div class="card mb-3 left-1/4 top-10" style={{"maxWidth": "1000px"}}>
  <div class="row g-0">
    <div class="col-md-4">
    <ImageComponent imagename={item.img}/>
    </div>
    <div class="col-md-8">
      <div class="card-body dark:bg-black">
        <h5 class="card-title dark:text-white">{item.title}</h5>
        <p class="card-text dark:text-white">{item.title}</p>
        <p class="card-text dark:text-white"><small class="text-body-secondary"><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleClick(item.id)} > Go there</button>Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>  
  </div>
     ))}
    </div>
  );
};
