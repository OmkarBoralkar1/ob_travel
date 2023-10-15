const mongoose = require('mongoose');

const rateblogschema = new mongoose.Schema({
  blogid:String,
  username: String,
  rating:String,
 
});
const rateblogmodel = mongoose.model('rating', rateblogschema);
module.exports =  rateblogmodel;
