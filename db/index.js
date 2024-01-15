const mongoose = require("mongoose");

// Define mongoose schemas

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: String
  });

  

  const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
    Id:String
    });

      
  // Define mongoose models
  const User = mongoose.model('User', userSchema);
  const Product= mongoose.model('Product', ProductSchema);
  
   
  module.exports = {
    User,
    Product
  }