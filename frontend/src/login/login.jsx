import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './login.module.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) {
      validationErrors.email = 'Email is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:3001/login', {
          email,
          password,
        });
        console.log('Login Response:', response);
      
        if (response.status === 200) {
          setProfileImageUrl(response.data.profileImageUrl);
          console.log("the profile image url is",setProfileImageUrl)
          setIsLoggedIn(true);
          
          // Store login status and profile image URL in local storage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('profileImageUrl', setProfileImageUrl);
          
          navigate('/');
        } else {
          alert('Authentication failed');
          console.log('Authentication failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error during authentication. Please try again later.');
      }
    }
  };

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <div class="login">
        <h1>Login </h1>
        <label htmlFor="email" className={styles['login-label']}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles['login-input']}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className={styles['login-label']}><br></br>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles['login-input']}
          required
        />
      </div><br></br>
      <button type="submit" className={styles['login-button']}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
