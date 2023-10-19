const express = require("express");
const router = express.Router()
const multer =require('multer');
const path =require('path');
const profileimgmodel =require('../models/profileimg.js');
const createblogmodel =require('../models/create-blog.js');

const storageblog = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/blogimg');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

const uploadblog = multer({
    storage: storageblog
})

router.post('/create', uploadblog.single('imgFile'), async (req, res) => {
  const { username,title,location,date,content } = req.body; // Access the username
  console.log('blog-details:', username);

  console.log(req.file);

  try {
    // Check if the user exists
    let user = await profileimgmodel.findOne({ username });

    if (user) {
      // If the user does not have a profile image, create a new profileimg object
      user = new createblogmodel({
        username,
        title,
        location,
        date,
        content,
        blogimg: req.file.filename,
        origimg: req.file.originalname
      });
    } 

    // Save the profileimg object to the database
    await user.save();

    // Return a success response
    res.status(201).json({ message: 'Blog Created successfully' });
  } catch (error) {
    // Handle error, send an error response, or log the error
    console.error('Error creating-blog :', error);
    res.status(500).json({ error: 'An error occurred while updating the profile image' });
  }
});

router.get('/getuserblogs/:storedEmail', async (req, res) => {
  try {
    const { storedEmail } = req.params;
    console.log("the storedemail by userblog is", storedEmail)

    // Check if the user exists in profileimgmodel
    const userimg = await profileimgmodel.findOne({ username: storedEmail });

    if (!userimg) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the blogs of the logged-in user in createblogmodel
    const userblogs = await createblogmodel.find({ username: storedEmail });
    console.log(userblogs)

    // Return the user's blogs
    res.status(200).json({ userblogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/popularblogs', async (req, res) => {
  try {
    // Fetch popular blogs based on your desired criteria
    const popularBlogs = await createblogmodel.find()
    console.log('the popular blogs are',popularBlogs)
    res.status(200).json({ popularBlogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/blogdetail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the blogid is", id);

    // Check if the user exists
    const userblog = await createblogmodel.findOne({ _id: id }); // Use _id instead of id
    console.log('the userblog is', userblog);
    // res.status(200).json({ userblog: JSON.stringify(userblog) });
    res.status(200).json({ userblog });
    if (!userblog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/detailcontentimg/:id',async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the blogid detail content is", id);
    const { username, newTitle,newLocation,newDate,newContent } = req.body;

    // Check if the user exists
    const userblog = await createblogmodel.findOne({ _id: id }); // Use _id instead of id
    console.log('the userblog for the detail content is', userblog);
    // res.status(200).json({ userblog: JSON.stringify(userblog) });
    res.status(200).json({ userblog });
    if (!userblog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/detailcontent/:id',async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the blogid detail content  to chnge is", id);
    const { username, newTitle,newLocation,newDate,newContent } = req.body;

    // Check if the user exists
    const userblog = await createblogmodel.findOne({ _id: id }); // Use _id instead of id
    console.log('the userblog for the detail content to change is', userblog);
    // res.status(200).json({ userblog: JSON.stringify(userblog) });
    res.status(200).json({ userblog });
    if (!userblog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    userblog.title = newTitle;
    await userblog.save();
    userblog.location = newLocation;
    await userblog.save();
    userblog.date = newDate;
    await userblog.save();
    userblog.content = newContent;
    await userblog.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/uploadblogimg', uploadblog.single('selectedFile'), async (req, res) => {
  const { id } = req.body; // Access the blog id
  console.log('blogid:', id);
  const { username } = req.body; // Access the username
  console.log('the username to change blogimg:', username);
  console.log(req.file);

  try {
    // Check if the user exists
    let blogimg = await createblogmodel.findOne({_id:id });
    if (!blogimg) {
      // If the user does not have a blog image, create a new blogimg object
      blogimg = new createblogmodel({
        id,
        username,
        blogimg: req.file.filename,
        origimg: req.file.originalname
      });
    } else {
      // If the user already has a blog image, update it
      blogimg.blogimg = req.file.filename;
      blogimg.origimg = req.file.originalname;
    }

    // Save the blogimg object to the database
    await blogimg.save();

    // Return a success response
    res.json({ message: 'Blog image updated successfully' });
  } catch (error) {
    // Handle error, send an error response, or log the error
    console.error('Error updating blog image:', error);
    res.status(500).json({ error: 'An error occurred while updating the blog image' });
  }
});
router.get('/getblogimg/:id', async (req, res) => {
  try {
      const { id } = req.params;
      console.log("the blog  id jwnforngonengg is", id)

      // Check if the user exists
      const blogimg = await createblogmodel.findOne({ _id: id });
      console.log('the blogimg is njnfjnvnvfjvnj', blogimg)
      if (!blogimg) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Return only the necessary user profile data, not the entire user object
     
      res.status(200).json({ blogimg });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports =  router;