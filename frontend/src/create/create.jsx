import React, { useState, useEffect } from 'react';
import createStyles from './create.module.css';
import { useNavigate } from 'react-router-dom';
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
    const [file, setFile] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        console.log("the loggin value is sored is",storedIsLoggedIn)
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
        }
        
        const storedEmail = localStorage.getItem('loggedInUserEmail');
        console.log("the actual email stored is",storedEmail )
        if (storedEmail) {
            setLoggedInUserEmail(storedEmail);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('Name', name);
            formData.append('Continent', continent);
            formData.append('Country', country);
            formData.append('State', state);
            formData.append('City', city);
            formData.append('title', title);
            formData.append('sub-title', subtitle);
            formData.append('Description', description);
            formData.append('pdfFile', file);
            formData.append('imgFile', imgFile);
            formData.append('loggedInUserEmail', loggedInUserEmail);

            const response = await axios.post('http://localhost:3001/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response.data);

            if (response.status === 201) {
                alert('You have successfully created a blog.');
                navigate('/'); // Navigate to the desired page after successful submission
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Error connecting to the server. Please try again later.');
        }
    };

    const handlePdfFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImageFileChange = (e) => {
        setImgFile(e.target.files[0]);
    };

    return (
        <div>
            <h1></h1><br></br><br></br><br></br>
            <h1></h1><br></br><br></br>
            {isLoggedIn ?
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







