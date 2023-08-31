import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './signup.module.css';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('contactNumber', contactNumber);
      formData.append('file', file);

      const response = await axios.post('http://localhost:3001/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);

      if (response.status === 201) {
        alert('You have successfully connected to the database');
        console.log('The response stored in the database is', response);
        navigate('../login'); // Navigate to the login page (remove .js)
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to the server. Please try again later.');
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit} action='Post'>
      <div>
        <h1>Signup</h1>
        <br />
        <label htmlFor="name" className={styles['signup-label']}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <br />
        <label htmlFor="email" className={styles['signup-label']}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <br />
        <label htmlFor="password" className={styles['signup-label']}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <br />
        <label htmlFor="contactNumber" className={styles['signup-label']}>
          Contact Number:
        </label>
        <input
          type="tel"
          id="contactNumber"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <br />
       
      </div>
      <br />
      <div>
        <label htmlFor="file" className={styles['signup-label']}>
          Upload A profile picture:
        </label>
        
        <input
          type="file"
          id="file"
          accept=".jpg, .jpeg, .png, "
          onChange={handleFileChange}
        />
      </div>
      <br />
    
      <button type="submit" className={styles['signup-button']}>
        Sign Up
      </button>
    </form>
  );
};
export default SignupForm;
