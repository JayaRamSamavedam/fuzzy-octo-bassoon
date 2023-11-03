import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageComponent(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Replace 'image-name.jpg' with the actual image name
    axios.get(`http://localhost:1593/post/image/${props.imagename}`, {
        headers:{ "Authorization":`Bearer ${window.localStorage.getItem("auth_token")}`} ,responseType: 'arraybuffer' })
      .then((response) => {
        const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImage(imageUrl);
        console.log(imageUrl);
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  }, []);

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      {image ? <img src={image} className="w-full" alt="Image" /> : 'Loading image...'}
    </div>
  );
}

export default ImageComponent;
