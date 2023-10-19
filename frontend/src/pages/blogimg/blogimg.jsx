import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './blogimg.module.css';
import sunset from '../../images/sunsetimage.jpg';

function Blogimg() {
  const { id } = useParams();
  console.log("the blogimg id is",id)
  const [blog, setBlogimg] = useState({});
  const [profile, setProfile] = useState({});
  const [profileimg, setProfileimg] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    console.log(storedIsLoggedIn);
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      const storedEmail = localStorage.getItem('loggedInUserEmail');
      console.log(storedEmail);
      if (storedEmail) {
        setLoggedInUserEmail(storedEmail);
        fetchUserProfile(storedEmail);
        fetchUserblogimg(id);
      }
    }
  }, [id]);

  const fetchUserProfile = async (storedEmail) => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.get(`http://localhost:5000/user/getprofile/${storedEmail}`);
      

      if (response.status === 200) {
        setProfile(response.data.user);
      } else {
        console.log('Error fetching user profile');
      }
     
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false); // Set loading state to false when done
    }
  };
  const fetchUserblogimg = async (id) => {
    setIsLoading(true);
    try {
      const responseimg = await axios.get(`http://localhost:5000/blog/getblogimg/${id}`);
console.log('API Response Data:', responseimg.data);
  
      if (responseimg.status === 200) {
        setBlogimg(responseimg.data.blogimg);
        console.log('v jvfnbrjb gjh bhjervfehv evr', setBlogimg)
      } else {
        console.log('Error fetching user profile image');
      }
    } catch (error) {
      console.error('Error fetching user profile image:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    
    formData.append('username', profile.username);
    formData.append('id', blog._id);
    formData.append('selectedFile', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/blog/uploadblogimg', formData);
      console.log(response.data);

      // If the upload was successful, set a success message and navigate to the profile
      if (response.status === 200) {
        alert('You have successfully updated your blogimg');
        navigate(`/details/${blog._id}`);
      } else {
        setError('Error uploading blog image.');
      }
    } catch (error) {
      setError('Error uploading blog image: ' + error.message);
    }
  };

  return (
    <div className={styles['blog-container']}>
      <div>
        <h1 className={styles['blog-Heading']}> Welcome Back {profile.username} 😊</h1>
        <h6>Here you can see and Update your blog image</h6>
      </div>
      <h2>Your Blog image</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          <img className={styles['blog-image']} src={`http://localhost:5000/blogimg/${blog.blogimg}`} alt="blogimg" />
          <br></br><br></br>
          <input type="file" accept="image/*" onChange={handleFileSelect} />
          <button className={styles['upload-button']} onClick={handleImageUpload}>Upload Blog Image</button>
        </>
      )}
    </div>
  );
}

export default Blogimg;