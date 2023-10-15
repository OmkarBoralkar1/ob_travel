import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './detailcontent.module.css';

const Detailscontent = () => {
    const { id } = useParams();
    const [detailcontent, setDetailContent] = useState(
        JSON.parse(localStorage.getItem('detailContent')) || {}
    );
    const [detailContentImg, setDetailContentImg] = useState(
        JSON.parse(localStorage.getItem('detailContentImg')) || {}
    );
    const contentInputRef = useRef(null);
    const [newTitle, setNewTitle] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newContent, setNewContent] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [titleDisabled, setTitleDisabled] = useState(true);
    const [locationDisabled, setLocationDisabled] = useState(true);
    const [dateDisabled, setDateDisabled] = useState(true);
    const [contentDisabled, setContentDisabled] = useState(true);
    const [blogimgDisabled, setblogimgDisabled] = useState(true);

    useEffect(() => {
        // Load data from localStorage if it exists
        const storedDetailContent = localStorage.getItem('detailContent');
        const storedDetailContentImg = localStorage.getItem('detailContentImg');

        if (storedDetailContent) {
            setDetailContent(JSON.parse(storedDetailContent));
        }

        if (storedDetailContentImg) {
            setDetailContentImg(JSON.parse(storedDetailContentImg));
        }

        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
            const storedEmail = localStorage.getItem('loggedInUserEmail');

            if (storedEmail) {
                setLoggedInUserEmail(storedEmail);
                fetchUserDetailContent(id);
                fetchUserDetailContentImg(id);
            }
        }
    }, [id]);

    useEffect(() => {
        // Save the necessary state data to localStorage
        localStorage.setItem('detailContent', JSON.stringify(detailcontent));
        localStorage.setItem('detailContentImg', JSON.stringify(detailContentImg));
    }, [detailcontent, detailContentImg]);

    const fetchUserDetailContent = async (storedEmail) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/blog/getdetailcontent/${storedEmail}`);

            if (response.status === 200) {
                setDetailContent(response.data.user);
            } else {
                console.log('Error fetching user detail content');
            }

        } catch (error) {
            console.error('Error fetching user detail content:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserDetailContentImg = async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/blog/detailcontentimg/${id}`);

            console.log('API Response Data:', response.data);

            if (response.status === 200) {
                setDetailContentImg(response.data.userblog);
                console.log('Image Data:', response.data.userblog);
            } else {
                console.log('Error fetching user detail content image');
            }
        } catch (error) {
            console.error('Error fetching user detail content image:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditTitle = () => {
        // Allow editing only if the logged-in user's email matches the detail content's email
        if (loggedInUserEmail === detailContentImg.username) {
            setTitleDisabled(false);
        }
    };
 

    const handleEditLocation = () => {
        if (loggedInUserEmail === detailContentImg.username) {
            setLocationDisabled(false);
        }
    };

    const handleEditDate = () => {
        if (loggedInUserEmail === detailContentImg.username) {
            setDateDisabled(false);
        }
    };

    const handleEditContent = () => {
        if (loggedInUserEmail === detailContentImg.username) {
            setContentDisabled(false);
            // Focus the input field

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!titleDisabled && newTitle.trim() === '') {
            validationErrors.title = 'Title cannot be blank.';
        }
        if (!locationDisabled && newLocation.trim() === '') {
            validationErrors.location = 'Location cannot be blank.';
        }
        if (!dateDisabled && newDate.trim() === '') {
            validationErrors.date = 'date cannot be blank.';
        }
        if (!contentDisabled && newContent.trim() === '') {
            validationErrors.content = 'Title cannot be blank.';
        }

        // Add similar validation checks for other fields (location, date, content)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else if (loggedInUserEmail === detailContentImg.username) {
            try {
                const response = await axios.post(`http://localhost:5000/blog/detailcontent/${id}`, {
                    username: detailContentImg.username,
                    newTitle: titleDisabled ? detailContentImg.title : newTitle,
                    newLocation: locationDisabled ? detailContentImg.location : newLocation,
                    newDate: dateDisabled ? detailContentImg.date : newDate,
                    newContent: contentDisabled ? detailContentImg.content : newContent,
                });

                if (response.status === 200) {
                    alert('You have successfully updated your details');
                    navigate(`/details/${detailContentImg._id}`);
                } else {
                    alert('Update failed');
                    console.log('Update failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error during update. Please try again later.');
            }
        } else {
            alert('You are not allowed to update the details.');
        }
    };

    return (
        <div className={styles['detailcontent-container']}>
            <div className={styles['detailcontent-image']}>
                <img
                    className={styles['detailcontent-image-content']}
                    src={`http://localhost:5000/blogimg/${detailContentImg.blogimg}`}
                    alt="detailcontentimg"
                    disabled={titleDisabled}
                />
                <br />
                <br />
                {loggedInUserEmail === detailContentImg.username ? (
                    <Link
                        to={`/Blogimg/${id}`}
                        className={styles['detailcontent-edit-button']}
                    >
                        ✏️
                    </Link>
                ) : (
                    // You can optionally render something else or nothing when the condition doesn't match
                    <span>You do not have permission to edit this.</span>
                )}


                <div className={styles['detailcontent-links-container']}>
                    <div className={styles['detailcontent-links-container-create']}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
                            <span className={styles['detailcontent-link']}>
                                <label htmlFor="newpassword" className={styles['detailcontent-create-blog']}>
                                    Destination:
                                </label>
                            </span>
                        </Link>
                    </div>
                    <div className={styles['detailcontent-links-container-my-blog']}>
                        <Link to="/stories/" style={{ textDecoration: 'none', color: 'blue' }}>
                            <span className={styles['detailcontent-link']}>
                                <label htmlFor="newpassword" className={styles['detailcontent-create-blog']}>
                                    Stories:
                                </label>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles['detailcontent-form']}>
                <div className={styles['detailcontent-content']}>

                    <br />
                    <form className={styles['detailcontent-form']} onSubmit={handleSubmit} action="post">
                        <div>
                            <br />
                            <label htmlFor="newTitle" className={styles['detailcontent-label']}>
                                Title:
                            </label>
                            <br />
                            <input
                                className={styles['detailcontent-input']}
                                type="text"
                                id="newTitle"
                                value={newTitle || detailContentImg.title}
                                onChange={(e) => setNewTitle(e.target.value)}
                                disabled={titleDisabled}
                                required
                            />
                            <Link
                                onClick={handleEditTitle}
                                className={styles['detailcontent-edit-button']}
                            >
                                ✏️
                            </Link>
                        </div>
                        <br />
                        <div>
                            <br />
                            <label htmlFor="newLocation" className={styles['detailcontent-label']}>
                                Location:
                            </label>
                            <br />
                            <input
                                className={styles['detailcontent-input']}
                                type="text"
                                id="newLocation"
                                value={newLocation || detailContentImg.location}
                                onChange={(e) => setNewLocation(e.target.value)}
                                disabled={locationDisabled}
                                required
                            />
                            <Link
                                onClick={handleEditLocation}
                                className={styles['detailcontent-edit-button']}
                            >
                                ✏️
                            </Link>
                        </div>
                        <br />
                        <div>
                            <br />
                            <label htmlFor="newDate" className={styles['detailcontent-label']}>
                                Date:
                            </label>
                            <br />
                            <input
                                className={styles['detailcontent-input']}
                                type="date"
                                id="newDate"
                                value={newDate || detailContentImg.date}
                                onChange={(e) => setNewDate(e.target.value)}
                                disabled={dateDisabled}
                                required
                            />
                            <Link
                                onClick={handleEditDate}
                                className={styles['detailcontent-edit-button']}
                            >
                                ✏️
                            </Link>
                        </div>
                        <br />
                        <div>
                            <br />
                            <label htmlFor="newContent" className={styles['detailcontent-label']}>
                                Content:
                            </label>
                            <br />
                            <textarea
                                className={styles['detailcontent-blogcontent']}
                                name="newcontent"
                                id="newcontent"
                                value={newContent || detailContentImg.content}
                                onChange={(e) => setNewContent(e.target.value)}
                                disabled={contentDisabled}
                                required
                                rows="8"  // You can adjust the number of rows as needed
                                cols="40" // You can adjust the number of columns as needed
                            // Allow vertical resizing
                            /><br></br>
                            <Link
                                onClick={handleEditContent}
                                className={styles['detailcontent-edit-button']}
                            >
                                ✏️
                            </Link>
                        </div>
                        <br />
                        <button type="submit" className={styles['detailcontent-button']}>
                            Update Details
                        </button>
                        <br />
                        <button className={styles['detailcontent-loginbutton']} onClick={() => navigate('/')}> ← Back to home</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Detailscontent;