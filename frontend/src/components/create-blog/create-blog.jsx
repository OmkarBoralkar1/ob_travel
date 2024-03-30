import React, { useState, useEffect } from "react";
import styles from "./create-blog.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function Create() {
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // const [loggedInUserEmail, setLoggedInUserEmail] = useState("");


    //   const [location, setLocation] = useState("");
    //   const [select, setSelect] = useState("");
    //   const [imgFile, setImgFile] = useState(null);
    //   const [selectedDate, setSelectedDate] = useState("");
    const navigate = useNavigate();

    const handleImageFileChange = (e) => {
        setImgFile(e.target.files[0]);
    };

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        console.log(storedIsLoggedIn)
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
            const storedEmail = localStorage.getItem('loggedInUserEmail');
            console.log(storedEmail)
            if (storedEmail) {
                setLoggedInUserEmail(storedEmail);
                fetchUserProfile(storedEmail);

            }
        }
    }, []);

    const fetchUserProfile = async (storedEmail) => {
        setIsLoading(true); // Set loading state to true
        try {
            const response = await axios.get(`http://localhost:5000/user/getprofile/${storedEmail}`);


            if (response.status === 200) {
                setProfile(response.data.user);
            } else {
                console.log('Error fetching user profile');
            }

        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setIsLoading(false); // Set loading state to false when done
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('username', profile.username);
            formData.append("title", title);
            formData.append("location", location);
            formData.append("date", selectedDate);
            formData.append("content", content);
            formData.append('imgFile', imgFile);

            //   const profileImageUrl = localStorage.getItem("profileImageUrl");
            //   formData.append("profileImageUrl", profileImageUrl);

            const response = await axios.post("http://localhost:5000/blog/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(formData);

            console.log("Response:", response.data);

            if (response.status === 201) {
                alert("You have successfully created a blog.");
                navigate("/"); // Navigate to the desired page after successful submission
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error connecting to the server. Please try again later.");
        }
    };
    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['image', 'link'],
            ['clean'],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'font': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'style': ['font-size'] }],
          ],
          
    };

    const quillFormats = [
        'header', 'font', 'list', 'bold', 'italic', 'underline', 'image', 'size', 'link'
      ];
    //   const handleContinentChange = (e) => {
    //     setSelect(e.target.value);
    //     setSelectedDate(""); // Reset selected date when the continent selection changes
    //   };
    //   const handleImageFileChange = (e) => {
    //     setImgFile(e.target.files[0]);
    //   };

    return (
        isLoggedIn ? (
            <div className={styles.scaffold}>
                {/* <img src={bgImg} alt="" /> */}
                <center>
                    <h1 className={styles.h1}>Share your experience with others!!</h1>
                </center>
                <div className={styles.formBox}>
                    <form onSubmit={handleSubmit}>
                        Title: <br />
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className={styles.box1} />
                        <br />
                        Name of the Location: <br />
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className={styles.box1}
                        />
                        <br />
                        When did you travel?: <br />
                        <input
                            type="date"
                            name="date"
                            id="travelDate"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            required
                            className={styles.box1}
                        />
                        {selectedDate && (
                            <p className={styles.box1}>You selected the date: {selectedDate}</p>
                        )}
                        <br />
                        Share your experience here: <br />
                        <ReactQuill
                            modules={quillModules} // Define the modules if needed
                            formats={quillFormats} // Define the formats if needed
                            value={content}
                            onChange={(newContent) => setContent(newContent)}
                            required
                            className={styles.box2}
                        />
                        <br />
                        Upload the title image of your Blog: <br />
                        <input
                            type="file"
                            id="imgFile"
                            name="selectedFile" // Update this to match the expected field name
                            accept=".jpg, .jpeg, .png"
                            onChange={handleImageFileChange}
                            required

                            className={styles.box1}
                        />
                        <br />
                        <button type="submit" onClick={() => alert("Are you sure you want to upload the blog!")}>Upload</button>
                    </form>
                </div>
            </div>
        ) :
            (
                <center><b><h1>Please log in to create a blog.</h1></b></center>
            )
    );
}
