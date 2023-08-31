const mongoose = require('mongoose');

const createschema = new mongoose.Schema({
  placename: String,
  
  continent: String,
  state: String,
  city: String,
  country: String,
  title: String,
  sub_title: String,
  Description: String,
  
  img_fileUrl: String, // This field will store the URL of the uploaded file
  pdf_fileUrl: String, // This field will store the URL of the uploaded file
  user: {
    name: String,
    email: String,
    profileImageUrl: String,
  },
});

const createModel = mongoose.model('create', createschema);
module.exports = createModel;
