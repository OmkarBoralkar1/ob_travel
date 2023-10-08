const express = require("express");
const router = express.Router()
const multer =require('multer');
const path =require('path');
const profileimgmodel =require('../models/profileimg.js');
const createblogmodel =require('../models/create-blog.js');
const commentblogmodel = require('../models/comment-blog.js');

router.get('/getcomment/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log("the blogid detail content is", id);
  
      // Find comments that match the provided blogid
      const comments = await commentblogmodel.find({ blogid: id });
      console.log("the comments of the blog are",comments)
  
      // Check if any comments were found
      if (!comments || comments.length === 0) {
        return res.status(404).json({ message: 'Comments not found for this blog' });
      }
  
      // Return the comments as JSON
      res.status(200).json({ comments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/comment',async (req, res) => {
    try {
      const {blogid,username, comment } = req.body;
      console.log("the comment detail content  to chnge is", req.body);
      // Check if the user exists
        // Check if the user exists
        
          // If the user does not have a profile image, create a new profileimg object
          blogcomments = new  commentblogmodel({
            blogid,
            username,
            comment,
          });
          console.log("the comment detail goen to the database  to chnge is",  blogcomments );
        
        // Save the profileimg object to the database
        await  blogcomments.save();
    
        // Return a success response
        res.status(200).json({ message: 'Commented successfully' });
      } catch (error) {
        // Handle error, send an error response, or log the error
        console.error('Error creating-blog :', error);
        res.status(500).json({ error: 'An error occurred while updating the profile image' });
      }
    });
module.exports =  router;