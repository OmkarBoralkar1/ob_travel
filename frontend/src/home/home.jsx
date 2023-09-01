
import homeStyles from './home.module.css'; // Import the CSS module
import React, { useState, useEffect } from 'react';
// Import the background image using a relative path
import contentImage from '../pictures/stock-photo-141823007-1500x1000.jpg'; // Import the content image using a relative path
import { Link } from 'react-router-dom';
import aivideo from '../pictures/ai.mp4'
import dhoodsagar from '../pictures/Train-Crossing-Waterfalls-Dudhsagar-Falls.jpg'
import victoria from '../pictures/Victoria-falls (2).jpg'
import matheran from '../pictures/Matheran.jpeg'
import bilkat from '../pictures/bilkat.mp4'
import borabora from '../pictures/bora-bora-island.jpg'
import axios from 'axios';
export default function Home() {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [error, setError] = useState(null);
  useEffect(()=>{
    axios.get('http://localhost:3001/popularblogs')
    .then(popularBlogs => setPopularBlogs(popularBlogs.data))
    .catch(err => console.log(err))
  },[])
  
  return (
    <div>
      <div className={homeStyles['home-body']}>
        <div className={homeStyles['home-pictures']} >
          <h1>Travel to the amazing sites</h1>
          <div className={homeStyles['image-animation']}>
            <img className={homeStyles['home-animation-image']} src={borabora} alt="Travel" />
            <img className={homeStyles['home-animation-image']} src={contentImage} alt="Travel" />
            <img className={homeStyles['home-animation-image']} src={matheran} alt="Travel" />
            <img className={homeStyles['home-animation-image']} src={victoria} alt="Travel" />
          </div>
        </div>
        <h1></h1><br></br><br></br><br></br>

        <h1>Popular places</h1>
        <div className={homeStyles['home-row']}>
          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <img className={homeStyles['home-image']} src={borabora} alt="Travel" />
              <h1>Bora-Bora-island</h1>
            </Link>
          </div>
          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <img className={homeStyles['home-image']} src={matheran} alt="Travel" />
              <h1>Matheran Hillstation Maharashtra</h1>
            </Link>
          </div>
          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <img className={homeStyles['home-image']} src={dhoodsagar} alt="Travel" />
              <h1>Dhoodsagar waterfalls Goa </h1>
            </Link>
          </div>
          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <img className={homeStyles['home-image']} src={victoria} alt="Travel" />
              <h1>Victoria waterfalls Zimbawe</h1>
            </Link>
          </div>
        </div>
        <h1>Pouplar Blogs</h1>
        <div className={homeStyles['home-row']}>
          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <img className={homeStyles['home-image']} src={contentImage} alt="Travel" />
              <h1>This is the very beautiful place of north-east india which will feel calm and will make you happy</h1>
            </Link>
          </div>
          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <video className={homeStyles['home-image']} controls>
                <source src={bilkat} type="video/mp4" />

              </video>
              <h1>This is the nice place of the london</h1>
            </Link>
          </div>

          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <video className={homeStyles['home-image']} controls>
                <source src={aivideo} type="video/mp4" />

              </video>
              <h1>This is the nice place of Sri Lanka</h1>
            </Link>
          </div>

          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <img className={homeStyles['home-image']} src={dhoodsagar} alt="Travel" />
              <h1>This is the nice place of the India which brings your mind peacefull energetic good for treaking </h1>
            </Link>
          </div>

          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <img className={homeStyles['home-image']} src={victoria} alt="Travel" />
              <h1>Beautiful and mindblowing victoria-falls of the Zimbawe</h1>
            </Link>
          </div>


          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <img className={homeStyles['home-image']} src={contentImage} alt="Travel" />
              <h1>This is the nice place of the canada</h1>
            </Link>
          </div>

          <div className={homeStyles['home-content']}>
            <Link className={homeStyles['home-content-link']} to="/details">
              <img className={homeStyles['home-image']} src={matheran} alt="Travel" />
              <h1>This is the nice place of the Brazil</h1>
            </Link>
          </div>
          </div>
         
          <h1> Blogs from the database</h1>
        <div className={homeStyles['home-row']}>
            {error ? (
              <p>Error fetching popular blogs. Please try again later.</p>
            ) : (
              <div className={homeStyles['home-body']}>
                {/* Your other content here */}
                {popularBlogs.map((blog) => (
                  <div className={homeStyles['home-content']} key={blog._id}>
                    <Link className={homeStyles['home-content-link']} to={`/details/${blog._id}`}>
                      <img className={homeStyles['home-image']} src={blog.img_fileUrl} alt="image" />
                      <h1>{blog.title}</h1>
                      <p>Place: {blog.Continent}</p>
                      <p>Country: {blog.Country}</p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      );
}
