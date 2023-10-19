const express = require("express");
const router = express.Router()
const multer =require('multer');
const path =require('path');
const profileimgmodel =require('../models/profileimg.js');
const createblogmodel =require('../models/create-blog.js');
const commentblogmodel = require('../models/comment-blog.js');
const rateblogmodel = require('../models/rate.js');

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

    router.post('/rate', async (req, res) => {
        const { blogid, username, rating } = req.body;
      
        try {
          // Check if a rating for this blogid and username already exists
          const existingRating = await rateblogmodel.findOne({ blogid, username });
      
          if (existingRating) {
            // If a rating exists, update it
            existingRating.rating = rating;
            await existingRating.save();
            res.status(200).send('Rating updated successfully');
          } else {
            // If no rating exists, create a new one
            const newRating = new rateblogmodel({ blogid, username, rating });
            await newRating.save();
            res.status(200).send('Rating saved successfully');
          }
        } catch (err) {
          console.error(err);
          res.status(500).send('Error handling rating');
        }
      });
    // Add a new route to fetch the user's rating for a specific blog
    router.get('/getuserrating/:id/:username', async (req, res) => {
    try {
      const { id, username } = req.params;
     console.log(req.params)
      // Find the rating that matches the provided blogid and username
      const rating = await rateblogmodel.findOne({ blogid: id, username });
      console.log('the rating is',rating)
      if (rating) {
        // If a rating exists, return it as JSON
        res.status(200).json({ rating: rating.rating });
      } else {
        // If no rating exists, you can return a default value or 0
        res.status(200).json({ rating: 0 });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  ///////////////////////////////////////////////////////////////////
  router.get('/getuserblograting/:id/', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('the blog id is', id);

        // Find all ratings that match the provided blogid
        const ratings = await rateblogmodel.find({ blogid: id });
        console.log('the ratings are', ratings);

        if (ratings && ratings.length > 0) {
            // If ratings exist, map them to an array
            const ratingArray = ratings.map((rating) => rating.rating);
            res.status(200).json({ ratings: ratingArray });
        } else {
            // If no ratings exist, you can return an empty array
            res.status(200).json({ ratings: [] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

  
module.exports =  router;