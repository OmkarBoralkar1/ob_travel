const mongoose = require('mongoose');

const commentblogschema = new mongoose.Schema({
  blogid:String,
  username: String,
  comment:String,
 
});
const commentblogmodel = mongoose.model('comments', commentblogschema);
module.exports =  commentblogmodel;
