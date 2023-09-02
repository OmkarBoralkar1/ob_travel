import React, { useState, useEffect } from 'react';
import myblogStyles from './my-blogs.module.css';
import contentImage from '../pictures/stock-photo-141823007-1500x1000.jpg';
import matheran from '../pictures/Matheran.jpeg';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function MyBlogs() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      const storedEmail = localStorage.getItem('loggedInUserEmail');
      if (storedEmail) {
        setLoggedInUserEmail(storedEmail);
        fetchUserBlogs(storedEmail);
      }
    }
  }, []);

  const fetchUserBlogs = async (email) => {
    try {
      const response = await fetch('http://localhost:3001/userblogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUserBlogs(data);
    } catch (error) {
      console.error('Error fetching user blogs:', error);
    }
  };

  return (
    <div>
      <h1></h1><br></br><br></br><br></br>
      <h2></h2><br></br>
      {isLoggedIn ?
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
              </div><br></br>
             
              {userBlogs.map((blog) => (
                <div className={myblogStyles['my-blog-content']} key={blog._id}>
                  <Link className={myblogStyles['my-blog-content-link']} to={`/details/${blog._id}`}>
                    {/* <img className={myblogStyles['my-blog-image']} src={blog.image_url || contentImage} alt="Travel" /> */}
                    <img className={myblogStyles['my-blog-image']} src={blog.img_fileUrl || contentImage} alt="Travel" />
                    <h1>{blog.title}</h1>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Please logged in to see my-blogs.</p>
        )}
    </div>
  );
}
