import React, { useState, useEffect } from 'react';
import createStyles from './create.module.css'; // Import the CSS styles as an object
import { Await, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Create() {
    const [name, setName] = useState('');
    const [continent, setContinent] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [title, settitle] = useState('');
    const [subtitle, setsubtitle] = useState('');
    // const [file, setFile] = useState(null);
    const [file, setSelectedPdfFiles] = useState([]);
    const [imgFile, setSelectedImageFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const navigate = useNavigate();
    const isAuthenticated = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Name:', name);
        console.log('Continent:', continent);
        console.log('Country:', country);
        console.log('State:', state);
        console.log('City:', city);
        console.log('title:', title);
        console.log('sub-title:', subtitle);
        console.log('Description:', description);
        console.log('File:', file);
        console.log('imgFile:', imgFile);
        try {
            const formData = new FormData();
            formData.append('Name', name);
            formData.append('Continent:', continent);
            formData.append('Country:', country);
            formData.append('State:', state);
            formData.append('City:', city);
            formData.append('title:', title);
            formData.append('sub-title:', subtitle);
            formData.append('Description:', description);
            formData.append('File:', file);
            formData.append('imgFile:', imgFile);
      
            const response =  axios.post('http://localhost:3001/create', formData, {
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
          } 
          catch (error) {
            console.error('Error:', error);
            alert('Error connecting to the server. Please try again later.');
          }
        };
    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedProfileImageUrl = localStorage.getItem('profileImageUrl');
      
        if (storedIsLoggedIn === 'true') {
          setIsLoggedIn(true);
        }
      
        
      }, []);
    const handlePdfFileChange = (e) => {
        const uploadedPdfFiles = Array.from(e.target.files);
        setSelectedPdfFiles(uploadedPdfFiles);
    };

    const handleImageFileChange = (e) => {
        const uploadedImageFiles = Array.from(e.target.files);
        setSelectedImageFiles(uploadedImageFiles);
    };
    return (
        <div>
            <h1></h1><br></br><br></br><br></br>
            <h1></h1><br></br><br></br>
            {isLoggedIn  ?
                (
                    <div>
                        <h1>Create your blog</h1>
                        <form className={createStyles.form} onSubmit={handleSubmit} action='Post'>
                            <div className={createStyles['create-box']}>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="hotelName">Place Name</label><br></br>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="continent">Continent</label><br></br>
                                    <select
                                        id="continent"
                                        value={continent}
                                        onChange={(e) => setContinent(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Continent</option>
                                        <option value="Africa">Africa</option>
                                        <option value="Asia">Asia</option>
                                        <option value="North-America">North-America</option>
                                        <option value="South-America">South-america</option>
                                        <option value="Austrila">Austrila</option>
                                        <option value="Europe">Europe</option>
                                        {/* ... add more continents here */}
                                    </select>
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="country">Country</label><br></br>
                                    <input
                                        type="text"
                                        id="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="state">State</label><br></br>
                                    <input
                                        type="text"
                                        id="state"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="city">City</label><br></br>
                                    <input
                                        type="text"
                                        id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="title">Title of your Blog</label><br></br>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => settitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="subtitle">Sub-Title of your Blog</label><br></br>
                                    <input
                                        type="text"
                                        id="sub-title"
                                        value={subtitle}
                                        onChange={(e) => setsubtitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="description">Description</label><br></br>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="pdfFiles">Upload the Blog (PDF)</label>
                                    <input
                                        type="file"
                                        id="pdfFiles"
                                        name="pdfFiles"
                                        accept=".pdf, .txt, .doc, .docx"
                                        onChange={handlePdfFileChange}
                                        multiple
                                    />
                                </div>
                                <div className={createStyles['create-form-group']}>
                                    <label htmlFor="imgFiles">Upload the image of your Blog</label>
                                    <input
                                        type="file"
                                        id="imgFile"
                                        name="imgFile"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleImageFileChange}
                                        multiple
                                    />
                                </div>

                                <button className={createStyles['create-button']} type="submit">Upload</button>
                            </div>
                        </form>
                    </div>


   ) : (
    <p>Please log in to create a blog.</p>
   )}
</div>
);
}







