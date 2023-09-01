import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SignupForm from './signup/signup';
import LoginForm from './login/login';
import Home from './home/home';
import Create from './create/create';
import MyBlogs from './my-blogs/my-blogs';
import Demoimg from './demoimg/demoimg';
import { AiOutlineSearch } from "react-icons/ai";

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login status
    // Perform any logout-related logic here
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('profileImageUrl');
  };

  // Retrieve login status and profile image URL from local storage on component mount
  useEffect(() => {
  
    const storedProfileImageUrl = localStorage.getItem('profileImageUrl');
    // console.log("the profile picture url from navbar is", storedProfileImageUrl)
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        console.log("the loggin value is sored is",storedIsLoggedIn)
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
        }
        
        const storedEmail = localStorage.getItem('loggedInUserEmail');
        console.log("the actual email stored is from ap.js",storedEmail )
        if (storedEmail) {
            setLoggedInUserEmail(storedEmail);
        }

    if (storedProfileImageUrl) {
      console.log("store profile imageurl is jfhr3giutghibygiuth4g", localStorage.getItem('profileImageUrl'));
      setProfileImageUrl(storedProfileImageUrl);
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <div className="header">
          <h1>Welcome to our Travelling Blog</h1>
          <nav>
            <ul className="nav-container">
              <div className="search-bar">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <AiOutlineSearch className='search-icon' />
              </div>
              <li className="home">
                <Link to="/">Home</Link>
              </li>
              <li className="Signup">
                <Link to="/signup">Signup</Link>
              </li>
              <li className="Login">
                {isLoggedIn ? (
                  <div className="profile-link">

                    <span onClick={handleLogout}>Logout</span>

                  </div>




                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>




              <li className="create-blogs">
                <Link to="/create"><span>Create-blogs</span></Link>
              </li>
              <li className="my-blogs">
                <Link to="/my-blogs"><span>My-blogs</span></Link>
              </li>
              <li className="Login">
                {isLoggedIn ? (
                  <div className="profile-link">
                    <img
                      className='picture'src={`http://localhost:3001/ob_travel/uploads/${localStorage.getItem('profileImageUrl')}`}

                  
                      alt="Profile"
                    />
                  </div>
                ) : (
                  // <Link to="/login">Login</Link>
                  <p></p>
                )}
              </li>
              <li className="my-blogs">
                <Link to="/demoimg"><span>demoimg</span></Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Routes>
            {/* Define routes */}
            <Route path="/" element={<Home />} />
            {/* ... (other routes) ... */}
          </Routes>
        </div>
        <br /><br />
        <div>
          <Routes>
            <Route path="/signup/*" element={<SignupForm />} />
            <Route path="/login/*" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/create/*" element={<Create />} />
            <Route path="/my-blogs/*" element={<MyBlogs />} />
            <Route path="/demoimg/*" element={<Demoimg />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

