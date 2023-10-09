import destinationStyles from './destination.module.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import Navbar from 'components/navbar/Navbar';

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
                    console.log('blogs data are:', response.data);

                    if (Array.isArray(response.data.popularBlogs) && response.data.popularBlogs.length > 0) {
                        const filteredBlogs = response.data.popularBlogs.filter((blog) => {
                            const searchTerms = `${blog.title} ${blog.content} ${blog.location} ${blog.date}`.toLowerCase();
                            return searchTerms.includes(searchQuery.toLowerCase());
                        });

                        setBlogs(filteredBlogs);
                        setTotalPages(Math.ceil(filteredBlogs.length / blogsPerPage));
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

    return (
        <div>
            <div className={destinationStyles['destination-body']}>
                <div className={destinationStyles['destination-upperbody']}>
                    <Navbar />
                    <center>
                        <h1 className={destinationStyles['destination-cote']}>
                            Discovering the wonders of our planet, one adventure at a time
                        </h1>
                    </center>
                    <h1></h1>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                <div className={destinationStyles['destination-detailssearch']}>
                    <div className={destinationStyles['destination-search-bar']}>
                        <input
                            type="search"
                            placeholder="Discover the world one destination at a time... "
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <AiOutlineSearch className={destinationStyles['destination-search-icon']} />
                    </div>
                </div>
                <div className={destinationStyles['destination-detailselect']}>
                    <div className={destinationStyles['destination-select-bar']}>
                        <label htmlFor="places">Filter by type of place</label>
                        <br></br>
                        <select
                            id="place"
                            value={selectplace}
                            onChange={(e) => setSelectplace(e.target.value)}
                            required
                        >
                            <option value="">Select One</option>
                            <option value="place">All types</option>
                        </select>
                    </div>
                    <div className={destinationStyles['destination-select-bar']}>
                        <label htmlFor="places">Sort by</label>
                        <br></br>
                        <select
                            id="sort"
                            value={selectsort}
                            onChange={(e) => setSelectsort(e.target.value)}
                            required
                        >
                            <option value="">Select One</option>
                            <option value="sort">Most Popular </option>
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
                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>Page {currentPage} of {totalPages}</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
