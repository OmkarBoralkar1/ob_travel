import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DetailStyles from './details.module.css';
import Navbar from 'components/navbar/Navbar';
function Details() {
    const [userblog, setBlog] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const blogid = id;
    console.log("the blogid is", id);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/blog/blogdetail/${id}`);

                console.log(response);

                if (response.status === 200) {
                    setBlog(response.data.userblog); // Assuming the API returns blog details
                } else {
                    setError('Error fetching blog details');
                }
            } catch (error) {
                console.error('Error fetching blog details:', error);
                setError('Error fetching blog details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogDetails();
    }, [id]); // Trigger the effect whenever the 'id' parameter changes


    return (
        <div>
            <div className={DetailStyles['Detail-body']}>
                <div className={DetailStyles['Detail-upperbody']}>
                    <Navbar />
                    <center>
                        <h1 className={DetailStyles['Detail-cote']}> Here you can see the detail blog</h1>
                    </center>

                    <h1></h1><br></br><br></br><br></br>
                </div>
                <h1 className={DetailStyles['Detail-storyheading']} >The blog details </h1>
                <p className={DetailStyles['Detail-storysubheading']}>Explore the detail of blog </p>
                <div className={DetailStyles['Detail-row']}>

                    <div>

                        <div>

                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    {error ? (
                                        <p className="error">{error}</p>
                                    ) : (
                                        <div className={DetailStyles['Detail-content']}>
                                            <p className={DetailStyles['Detail-storysubheading']}> blog ID : {id}</p>
                                            <Link className={DetailStyles['Detail-content-link']} to={`/details-content/${userblog._id}`}>
                                                <img className={DetailStyles['Detail-image']} src={`http://localhost:5000/blogimg/${userblog.blogimg}`} alt="Travel" />
                                                <div className={DetailStyles['Detail-details']}>

                                                    <h5 className={DetailStyles['Detail-place']}>{userblog.location}</h5>
                                                    <h5 className={DetailStyles['Detail-date']}>{userblog.date}</h5>

                                                </div>
                                                <h1>{userblog.title}</h1>
                                                <textarea
                                                    className={DetailStyles['Detail-contents']}
                                                    value={userblog.content}
                                                    rows="10" // You can adjust the number of rows as needed
                                                    cols="70" // You can adjust the number of columns as needed
                                                    style={{ resize: 'both' }} // Allow both vertical and horizontal resizing
                                                    readOnly // Make it read-only if needed
                                                />
                                            </Link>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
