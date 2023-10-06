// module imports
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const router = express.Router();

const path =require('path');
//router imports


//util imports


//app config
const app = express();
const signupModel = require('./models/signup.js');
const profileimgmodel =require('./models/profileimg.js');
const createblogmodel =require('./models/create-blog.js');
app.use(express.json());
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

app.use('/user',UserRoute)
app.use('/blog',BlogRoute)
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