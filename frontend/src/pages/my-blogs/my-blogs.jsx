import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myblogStyles from './my-blogs.module.css';
import matheran from '../../images/Matheran.jpeg';
import contentImage from '../../images/stock-photo-141823007-1500x1000.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyBlogs() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userBlogs, setUserBlogs] = useState([]);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [blogsPerPage] = useState(9);
    const navigate = useNavigate();

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
            const storedEmail = localStorage.getItem('loggedInUserEmail');
            if (storedEmail) {
                setLoggedInUserEmail(storedEmail);
                fetchUserProfile(storedEmail);
                fetchUserblogs(storedEmail);
            }
        }
    }, []);

    const fetchUserProfile = async (storedEmail) => {
        setIsLoading(true);
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
            setIsLoading(false);
        }
    };

    const fetchUserblogs = async (storedEmail) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/blog/getuserblogs/${storedEmail}`);

            if (response.status === 200) {
                console.log('User blogs data:', response.data); // Log the response data

                if (Array.isArray(response.data.userblogs) && response.data.userblogs.length > 0) {
                    setUserBlogs(response.data.userblogs);
                    setTotalPages(Math.ceil(response.data.userblogs.length / blogsPerPage));
                } else {
                    setUserBlogs([]);
                    setTotalPages(1);
                }
            } else {
                console.log('Error fetching user blogs');
            }
        } catch (error) {
            console.error('Error fetching user blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <h1></h1>
            <br></br>
            <br></br>
            <br></br>
            <li className={myblogStyles.Login}>
                <button className={myblogStyles['Login-button']} onClick={() => navigate('/profile')}>profile</button>
            </li>
            <br></br>
            <br></br>
            {isLoggedIn ? (
                <div className={myblogStyles['my-blog-body']}>
                    <div className={myblogStyles['my-blog-row']}>
                       
                       
                        <br></br>
                        {userBlogs.length === 0 ? (
                            <h1> Hi {profile.username}! You have not created any blogs yet.</h1>
                        ) : (
                            userBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage).map((blog) => (
                                <div className={myblogStyles['my-blog-content']} key={blog._id}>
                                    <Link className={myblogStyles['my-blog-content-link']} to={`/details/${blog._id}`}>
                                        <img className={myblogStyles['my-blog-image']}  src={`http://localhost:5000/blogimg/${blog.blogimg}`} alt="Travel" />
                                        <h1>{blog.title}</h1>
                                    </Link>
                                </div>
                            ))
                        )}
                        <div className={myblogStyles['pagination']}>
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                &lt;
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Please log in to see my-blogs.</h1>
                </div>
            )}
        </div>
    );
}
