import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './comments.module.css';

const CommentForm = () => {
  const { id } = useParams();
  const [comments, setComments] = useState('');
  const [userRating, setUserRating] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [fetchedComments, setFetchedComments] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(1); // Add selectedNumber state

  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      const storedEmail = localStorage.getItem('loggedInUserEmail');
      if (storedEmail) {
        setLoggedInUserEmail(storedEmail);
      }
    }
    fetchComments();
    // Fetch user rating if logged in
    if (isLoggedIn) {
      fetchUserRating();
    }
  }, [id]);

  useEffect(() => {
    // Fetch user rating when the component mounts and when `isLoggedIn` changes
    if (isLoggedIn) {
      fetchUserRating();
    }
  }, [isLoggedIn]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/comment/getcomment/${id}`);
      if (response.status === 200) {
        setFetchedComments(response.data.comments);
      } else {
        console.log('Error fetching comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchUserRating = async () => {
    try {
      // Fetch the user's rating for the current blog post
      const responserating = await axios.get(`http://localhost:5000/comment/getuserrating/${id}/${loggedInUserEmail}`);
      if (responserating.status === 200) {
        // Update the userRating state with the fetched rating
        setUserRating(responserating.data.rating);
      }
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      console.log('User is not logged in');
      return;
    }

    if (!comments) {
      console.log('Comment is empty');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/comment/comment`, {
        blogid: id,
        username: loggedInUserEmail,
        comment: comments,
      });

      if (response.status === 200) {
        alert('You have successfully commented on your blog');
        setComments('');
        navigate(`/details/${id}`);
        fetchComments();
      } else {
        console.log('Error adding comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleRatingChange = (e) => {
    const rating = e.target.value;
    setSelectedNumber(rating);

    try {
      // Send the rating data to your API endpoint
      const response = axios.post(`http://localhost:5000/comment/rate`, {
        blogid: id,
        username: loggedInUserEmail,
        rating: rating,
      });

      if (response.status === 200) {
        alert('Your rating has been recorded.');
      } else {
        console.log('Error rating the blog');
      }
    } catch (error) {
      console.error('Error rating the blog:', error);
    }
  };


  return (
    <div className={styles['comment-container']}>
      <div className={styles['comment-form']}>
        <div className={styles['comment-content']}>
          {isLoggedIn ? (
            <div>
              <br />
              <form className={styles['comment-form']} onSubmit={handleSubmit} action="Post">
                <div>
                  <label htmlFor="comments" className={styles['comment-label']}>
                    Please write your comments:
                  </label>
                  <br />
                  <textarea
                    className={styles['comment-input']}
                    id="comments"
                    value={comments}
                    rows="4"
                    cols="50"
                    onChange={(e) => setComments(e.target.value)}
                    required
                  />
                </div>
                <br />
                <button type="submit" className={styles['comment-button']}>
                  Comment
                </button>
              </form>
              <label htmlFor="number">Rate your blog from 1 to 5:</label>
              <select id="number" value={selectedNumber} onChange={handleRatingChange}>
                {[0,1, 2, 3, 4, 5].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <h4>Please log in to write comments and rate the blog.</h4>
          )}
        </div>
        {userRating !== null && (
        <div className={styles['user-rating-box']}>
          <h3>Your Rating:</h3>
          <p>{userRating}</p>
        </div>
      )}
        <h2> The Comments related to the blog</h2>
        <ul>
          {fetchedComments.map((comment, index) => (
            <li key={index} className={styles['comment']}>
              <span className={styles['comment-username']}>{comment.username}</span>
              <p className={styles['comment-text']}>{comment.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )};

export default CommentForm;
