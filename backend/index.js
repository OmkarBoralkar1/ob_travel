// module imports
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const router = express.Router();

const path = require('path');
//router imports

//util imports

//app config
const app = express();
const signupModel = require('./models/signup.js');
const profileimgmodel = require('./models/profileimg.js');
const createblogmodel = require('./models/create-blog.js');

// Increase the request size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.static('public'))

app.get("/api", (req,res) => {
    res.send("Main page");
});


require("dotenv").config();
const PORT1 = 5000;
const PORT = process.env.PORT;
const UserRoute =require('./Routes/User.js')
const BlogRoute =require('./Routes/blog.js')
const CommentRoute =require('./Routes/comments.js')

const bodyParser = require('body-parser');

// Add this middleware before your route handling
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/user',UserRoute)
app.use('/blog',BlogRoute)
app.use('/comment',CommentRoute)
mongoose.connect('mongodb://127.0.0.1:27017/travel-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  app.listen(PORT1, () => console.log(`Server listening to port ${PORT1}`));