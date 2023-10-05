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
import SignupForm from 'components/signup/Signup';
import LoginForm from 'components/login/Login';
import ForgotpasswordForm from 'components/forgotpassword/forgotpassword';
import ResetpasswordForm from 'components/forgotpassword/resetpassword';
import MyBlogs from 'components/my-blogs/my-blogs';
import Profile from 'components/profile/profile';
import Destination from 'components/Destination/destination';
import Stories from 'components/stories/stories';
import Create from 'components/create-blog1/create-blog1';
import Profileimg from 'components/profileimg/profileimg';
import Details from 'components/details/details';
import Detailscontent from 'components/Detail-content/detailcontent';
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
          </Routes>
        </div>
    
    </BrowserRouter>
  );
};

export default App;



