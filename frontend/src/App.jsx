import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
// import SignupForm from './signup/signup';
// import LoginForm from './login/login';
// import Home from './home/home';
// import Create from './create/create';
// import MyBlogs from './my-blogs/my-blogs';
// import Demoimg from './demoimg/demoimg';
// import { AiOutlineSearch } from "react-icons/ai";
// import axios from 'axios';
import SignupForm from 'pages/signup/Signup';
import LoginForm from 'pages/login/Login';
import ForgotpasswordForm from 'pages/forgotpassword/forgotpassword';
import ResetpasswordForm from 'pages/forgotpassword/resetpassword';
import MyBlogs from 'pages/my-blogs/my-blogs';
import Profile from 'pages/profile/profile';
import Destination from 'pages/Destination/destination';
import Stories from 'pages/stories/stories';
import Create from 'components/create-blog/create-blog';
import Profileimg from 'pages/profileimg/profileimg';
import Details from 'pages/details/details';
import Detailscontent from 'pages/Detail-content/detailcontent';
import Blogimg from 'pages/blogimg/blogimg';
import CommentForm from 'pages/comments/comments';
const App = () => {


  return (
    <BrowserRouter>
      
        <div>
          <Routes>
            <Route path="/signup/*" element={<SignupForm />} />
            <Route path="/Forgotpassword/*" element={<ForgotpasswordForm />} />
            <Route path="/Resetpassword/*" element={<ResetpasswordForm/>} />
            <Route path="/login/*" element={<LoginForm  />} />
            <Route path="/create/*" element={<Create />} />
            <Route path="/my-blogs/" element={<MyBlogs />} />
            <Route path="/" element={<Destination />} />
            <Route path="/stories/*" element={<Stories />} />
            <Route path="/profileimg/*" element={<Profileimg />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/details-content/:id" element={<Detailscontent />} />
            <Route path="/Blogimg/:id" element={<Blogimg />} />
            <Route path="/Comment/:id" element={<CommentForm />} />
          </Routes>
        </div>
    
    </BrowserRouter>
  );
};

export default App;



