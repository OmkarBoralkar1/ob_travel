
import { useState, useEffect } from 'react';
import storiesStyles from './stories.module.css'; // Import the CSS module
// Import the background image using a relative path
// import contentImage from '../pictures/stock-photo-141823007-1500x1000.jpg'; // Import the content image using a relative path
import { Link } from 'react-router-dom';
// import aivideo from '../pictures/ai.mp4'
// import dhoodsagar from '../pictures/Train-Crossing-Waterfalls-Dudhsagar-Falls.jpg'
// import victoria from '../pictures/Victoria-falls (2).jpg'
// import matheran from '../pictures/Matheran.jpeg'
// import bilkat from '../pictures/bilkat.mp4'
// import borabora from '../pictures/bora-bora-island.jpg'

import Navbar from 'components/navbar/Navbar';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
export default function Stories() {
    const [isLoading, setIsLoading] = useState(false);
    const [userBlogs, setUserBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(2);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectplace, setSelectplace] = useState('');
    const [selectsort, setSelectsort] = useState('');
    const [select, setSelect] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/blog/popularblogs`);

                if (response.status === 200) {
                    console.log('blogs data are:', response.data);

                    if (Array.isArray(response.data.popularBlogs) && response.data.popularBlogs.length > 0) {
                        const filteredBlogs = response.data.popularBlogs.filter((blog) => {
                            const searchTerms = `${blog.title} ${blog.content} ${blog.location} ${blog.date}`.toLowerCase();
                            return searchTerms.includes(searchQuery.toLowerCase());
                        });

                        setTotalPages(Math.ceil(filteredBlogs.length / blogsPerPage));
                        const shuffledBlogs = shuffleArray(filteredBlogs);
                        setBlogs(shuffledBlogs);
                    } 
                    else {
                        setBlogs([]);
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

        fetchData();
    }, [searchQuery]);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleContinentChange = (e) => {
        setSelect(e.target.value);
        setSelectedDate('');
    };

    function truncateContent(content) {
        if (typeof content !== 'string') {
            return ''; // Handle the case when 'content' is not a string
        }
    
        // Use a regular expression to remove HTML tags
        const plainText = content.replace(/<[^>]*>/g, '');
    
        // Split the plain text by line breaks
        const lines = plainText.split('\n');
    
        // Get the first two lines and join them
        const truncatedContent = lines.slice(0, 1).join('\n');
    
        return truncatedContent;
    }

    return (
        <div>
            <div className={storiesStyles['stories-body']}>
                <div className={storiesStyles['stories-upperbody']}>
                    <Navbar />
                    <center>
                        <h1 className={storiesStyles['stories-cote']}>Travel Stories from different people globally</h1>
                    </center>

                    <h1></h1><br></br><br></br><br></br>
                </div>
                <h1 className={storiesStyles['stories-storyheading']} >Top Travel Sories </h1>
                <p className={storiesStyles['stories-storysubheading']}>Explore our latest stories from our active users</p>
                <div className={storiesStyles['stories-detailssearch']}>
                    <div className={storiesStyles['stories-search-bar']}>
                        <input
                            type="search"
                            placeholder="Explore stories from around the globe.."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <AiOutlineSearch className={storiesStyles['stories-search-icon']} />
                    </div>
                </div>
                <div className={storiesStyles['stories-row']}>

                    <div>

                        <div>

                            {error ? (
                                <p>Error fetching popular blogs. Please try again later.</p>
                            ) : (

                                <div className={storiesStyles['stories-row']}>

                                    {currentBlogs.map((blog) => (
                                        <div className={storiesStyles['stories-content']}>
                                            <Link className={storiesStyles['stories-content-link']} to={`/details/${blog._id}`}>
                                                <img className={storiesStyles['stories-image']} src={`http://localhost:5000/blogimg/${blog.blogimg}`} alt="Travel" />
                                                <div className={storiesStyles['stories-details']}>
                                                    <h5>
                                                        <span className={storiesStyles['stories-place']}>{blog.location}</span>
                                                        <span className={storiesStyles['stories-date']}>{blog.date}</span>
                                                    </h5>
                                                </div>
                                                <h1>{blog.title}</h1>
                                                <h6 className={storiesStyles['stories-content']}>{truncateContent(blog.content)}</h6>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}


                        </div>
                        <div className={storiesStyles['pagination']}>
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                Previous Page
                            </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>Page {currentPage} of {totalPages}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                Next Page
                            </button>
                        </div>
                    </div>


                </div>
            </div>


        </div>
    );
}








