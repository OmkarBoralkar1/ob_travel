const mongoose = require('mongoose');

const createblogschema = new mongoose.Schema({
  username: String,
  title:String,
  location:String,
  date:String,
  content:String,
  blogimg:String,
  origimg:String,
});
const createblogmodel = mongoose.model('create-blog', createblogschema);
module.exports =  createblogmodel;
