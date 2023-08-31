const mongoose = require('mongoose');

const signupschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contactNumber: String,
  fileUrl: String, // This field will store the URL of the uploaded file
});

const signupmodel = mongoose.model('travel', signupschema);
module.exports = signupmodel;
