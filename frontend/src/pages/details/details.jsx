import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailStyles from './details.module.css';
import Navbar from 'components/navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function Details() {
    const [userblog, setBlog] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ratingCounts, setRatingCounts] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/blog/blogdetail/${id}`);

                if (response.status === 200) {
                    setBlog(response.data.userblog);
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
    }, [id]);

    useEffect(() => {
        const fetchUserRating = async () => {
            try {
                const responserating = await axios.get(`http://localhost:5000/comment/getuserblograting/${id}`);
                if (responserating.status === 200) {
                    const userRatings = responserating.data.ratings;

                    if (userRatings && userRatings.length > 0) {
                        const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                        userRatings.forEach((rating) => {
                            const numericRating = parseInt(rating, 10);
                            if (!isNaN(numericRating) && numericRating >= 0 && numericRating <= 5) {
                                counts[numericRating]++;
                            }
                        });
                        setRatingCounts(counts);
                    }
                }
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        };

        fetchUserRating();
    }, [id]);

    return (
        <div>
            <div className={DetailStyles['Detail-body']}>
                <div className={DetailStyles['Detail-upperbody']}>
                    <Navbar />
                    <center>
                        <h1 className={DetailStyles['Detail-cote']}> Here you can see the detail blog</h1>
                    </center>
                    <h1></h1><br></br><br></br><br></br>
                </div><br></br><br></br><br></br>
                <div className={DetailStyles['detail-container']}>
                    <div className={DetailStyles['detail-box']}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
                            <label>Destination:</label>
                        </Link>
                    </div>
                    <div className={DetailStyles['detail-box']}>
                        <Link to="/stories" style={{ textDecoration: 'none', color: 'blue' }}>
                            <label>Stories:</label>
                        </Link>
                    </div>
                </div>
                <h1 className={DetailStyles['Detail-storyheading']}>The blog details </h1>
                <p className={DetailStyles['Detail-storysubheading']}>Explore the detail of the blog</p>


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
                                            <p className={DetailStyles['Detail-blogid']}> blog ID: {id}</p>
                                            <Link className={DetailStyles['Detail-content-link']} to={`/details-content/${userblog._id}`}>



                                                <img className={DetailStyles['Detail-image']} src={`http://localhost:5000/blogimg/${userblog.blogimg}`} alt="Travel" />
                                                <div className={DetailStyles['Detail-details']}>
                                                    <h5 className={DetailStyles['Detail-place']}>{userblog.location}</h5>
                                                    <h5 className={DetailStyles['Detail-date']}>{userblog.date}</h5>
                                                </div>
                                                <div></div>
                                                <h1>{userblog.title}</h1>
                                                <ReactQuill
                                                    className={DetailStyles['Detail-contents']}
                                                    value={userblog.content}
                                                    rows="10"
                                                    cols="30"
                                                    style={{ resize: 'both' }}
                                                    readOnly
                                                />
                                                <div className={DetailStyles['rating-table']}>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Rating</th>
                                                                <th>Number of Ratings done by user</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>

                                                                <td>0</td>
                                                                <td>{ratingCounts[0]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>{ratingCounts[1]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>{ratingCounts[2]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>3</td>
                                                                <td>{ratingCounts[3]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>4</td>
                                                                <td>{ratingCounts[4]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>5</td>
                                                                <td>{ratingCounts[5]}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Link>
                                            <button
                                                className={DetailStyles['detail-commentbutton']}
                                                onClick={() => navigate(`/Comment/${userblog._id}`)}
                                            >
                                                Please write comments and rate the blog
                                            </button>
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
