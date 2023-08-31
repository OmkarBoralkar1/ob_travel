import React, { useState, useEffect } from 'react';

import myblogStyles from './my-blogs.module.css'; // Import the CSS module
// Import the background image using a relative path
import contentImage from '../pictures/stock-photo-141823007-1500x1000.jpg'; // Import the content image using a relative path
import { Link } from 'react-router-dom';
import matheran from '../pictures/Matheran.jpeg'
import bilkat from '../pictures/bilkat.mp4'
export default function MyBlogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
   
  
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  
  }, []);
  return (
    <div>
      <h1></h1><br></br><br></br><br></br>
      <h2></h2><br></br>
      {isLoggedIn  ?
                (
    <div className={myblogStyles['my-blog-body']} >
      <div className={myblogStyles['my-blog-row']}>
        <div className={myblogStyles['my-blog-content']}>
          <Link className={myblogStyles['my-blog-content-link']} to="/details">
            <img className={myblogStyles['my-blog-image']} src={contentImage} alt="Travel" />
            <h1>This is the very beautiful place of north-east india which will feel calm and will make you happy</h1>
          </Link>
        </div>
        <div className={myblogStyles['my-blog-content']}>
          <Link className={myblogStyles['my-blog-content-link']} to="/details">
            <img className={myblogStyles['my-blog-image']} src={contentImage} alt="Travel" />
            <h1>This is the nice place of the london</h1>
          </Link>
        </div>
       
        <div className={myblogStyles['my-blog-content']}>
          <Link className={myblogStyles['my-blog-content-link']} to="/details">
            <img className={myblogStyles['my-blog-image']} src={matheran} alt="Travel" />
            <h1>This is the nice place of the Brazil</h1>
          </Link>
        </div>
      </div>
    </div>
    ) : (
      <p>Please logged in to see my-blogs.</p>
      )}
      </div>
  );
}
