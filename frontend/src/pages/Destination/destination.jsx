
import destinationStyles from './destination.module.css'; // Import the CSS module
import React, { useState, useEffect } from 'react';
// Import the background image using a relative path
// import contentImage from '../pictures/stock-photo-141823007-1500x1000.jpg'; // Import the content image using a relative path
import { Link } from 'react-router-dom';
// import aivideo from '../pictures/ai.mp4'
// import dhoodsagar from '../pictures/Train-Crossing-Waterfalls-Dudhsagar-Falls.jpg'
// import victoria from '../pictures/Victoria-falls (2).jpg'
// import matheran from '../pictures/Matheran.jpeg'
// import bilkat from '../pictures/bilkat.mp4'
// import borabora from '../pictures/bora-bora-island.jpg'
import borabora from '../../images/bora-bora-island.jpg'
import sunset from '../../images/sunsetimage.jpg'
import matheran from '../../images/Matheran.jpeg'
import victoria from '../../images/Victoria-falls (2).jpg'
import dhoodsagar from '../../images/Train-Crossing-Waterfalls-Dudhsagar-Falls.jpg'
import travel from '../../images/travel.jpg'
import contentImage from '../../images/stock-photo-141823007-1500x1000.jpg'
import Navbar from 'components/navbar/Navbar';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";
export default function Destination() {
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
                    console.log('blogs data are:', response.data); // Log the response data

                    if (Array.isArray(response.data.popularBlogs) && response.data.popularBlogs.length > 0) {
                        setBlogs(response.data.popularBlogs); // Update the 'blogs' state with the fetched data
                        setTotalPages(Math.ceil(response.data.popularBlogs.length / blogsPerPage));
                    } else {
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

        fetchData(); // Call the asynchronous function
    }, []);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Function to change the current page
    const paginate = (pageNumber) => {
        // Ensure the new page number is within bounds
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const handleContinentChange = (e) => {
        setSelect(e.target.value);
        setSelectedDate(''); // Reset selected date when the continent selection changes
    };


    return (
        <div>
            <div className={destinationStyles['destination-body']}>
                <div className={destinationStyles['destination-upperbody']}>
                    <Navbar />
                    <center>
                        <h1 className={destinationStyles['destination-cote']}>Discovering the wonders of our planet, one adventure at a time</h1>
                    </center>
                    <h1></h1><br></br><br></br><br></br>
                </div>
                <div className={destinationStyles['destination-detailssearch']}>
                    <div className={destinationStyles['destination-search-bar']}>
                        <input
                            type="search"
                            placeholder="Search for places, hotels or restaurants"
                            value={searchQuery}
                            onChange={handleSearchChange}

                        />
                        <AiOutlineSearch className={destinationStyles['destination-search-icon']} />
                    </div>
                </div>
                <div className={destinationStyles['destination-detailselect']}>
                    <div className={destinationStyles['destination-select-bar']}>
                        <label htmlFor="places">Filter by type of place</label><br></br>
                        <select
                            id="place"
                            value={selectplace}
                            onChange={(e) => setSelectplace(e.target.value)}
                            required>
                            <option value="">Select One</option>
                            <option value="place">All types</option>
                            {/* Add more options as needed */}
                        </select>

                    </div>

                    <div className={destinationStyles['destination-select-bar']}>
                        <label htmlFor="places">Sort by</label><br></br>
                        <select
                            id="sort"
                            value={selectsort}
                            onChange={(e) => setSelectsort(e.target.value)}
                            required>
                            <option value="">Select One</option>
                            <option value="sort">Most Popular </option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </div>
                <h1>Popular places</h1>
                <div className={destinationStyles['destination-row']}>









                    <div>
                        
                        {error ? (
                            <p>Error fetching popular blogs. Please try again later.</p>
                        ) : (

                            <div className={destinationStyles['destination-row']}>

                                {currentBlogs.map((blog) => (
                                    <div className={destinationStyles['destination-content']} key={blog._id}>
                                        <Link className={destinationStyles['destination-content-link']} to={`/details/${blog._id}`}>
                                            <img className={destinationStyles['destination-image']} src={`http://localhost:5000/blogimg/${blog.blogimg}`} alt="blogs" />

                                            <h1>{blog.location}</h1>

                                        </Link>
                                    </div>
                                ))}
                                <div className={destinationStyles['pagination']}>
                                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                        Previous Page
                                    </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>Page {currentPage} of {totalPages}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                        Next Page
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>


                </div>

            </div>
        </div>

    );
}
