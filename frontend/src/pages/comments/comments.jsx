import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './comments.module.css';

const CommentForm = () => {
  const { id } = useParams();
  const [comments, setComments] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [fetchedComments, setFetchedComments] = useState([]); // State to store fetched comments
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

    // Fetch comments when the component mounts
    fetchComments();
  }, [id]);
  // Function to fetch comments
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      // Handle case when the user is not logged in
      // You may want to redirect to the login page or show an error message.
      console.log('User is not logged in');
      return;
    }

    if (!comments) {
      // Handle case when the comment is empty
      // You may want to show an error message to the user.
      console.log('Comment is empty');
      return;
    }

    try {
      // Send the comment data to your API endpoint
      const response = await axios.post(`http://localhost:5000/comment/comment`, {
        blogid: id,
        username: loggedInUserEmail,
        comment: comments,
      });

      if (response.status === 200) {
        alert("You have successfullt commented your blog")
        // Comment was successfully added
        console.log('Comment added successfully');
        // Optionally, you can clear the comment input field or update the UI.
        setComments('');
        // You can also navigate to the blog post or update the UI as needed.
        // navigate(`/details/${id}`);
      } else {
        // Handle the case when there's an error adding the comment
        console.log('Error adding comment');
        // Optionally, you can show an error message to the user.
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle the case when there's an error making the API request
      // You can show an error message to the user.
    }
  };
  return (
    <div className={styles['comment-container']}>
      <div className={styles['comment-form']}>
        <div className={styles['comment-content']}>
          {isLoggedIn ? ( // Check if the user is logged in
            <div>
              <br />
              <form className={styles['comment-form']} onSubmit={handleSubmit} action='Post'>
                <div>
                  <label htmlFor="comments" className={styles['comment-label']}>
                    Please write your comments:
                  </label>
                  <br></br><br></br><br></br>
                  <textarea
                    className={styles['comment-input']}
                    id="comments"
                    value={comments}
                    rows="100"  // You can adjust the number of rows as needed
                    cols="100000"
                    onChange={(e) => setComments(e.target.value)}
                    required
                  />
                </div>
                <br></br><br></br><br></br>
                <button type="submit" className={styles['comment-button']}>
                  Comment
                </button>
                <br></br><br></br>
              </form>
            </div>
          ) : (
            <h4>Please log in to write  the comments.</h4>
          )}
        </div>
        <h2> The Comments related to the blog</h2>
        <ul>
          {fetchedComments.map((comment, index) => (
            <li key={index} className={styles['comment']}>
              <span className={styles['comment-username']}>{comment.username}:</span>
              <p className={styles['comment-text']}>{comment.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )};
export default CommentForm;