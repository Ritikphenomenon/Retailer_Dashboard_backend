const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/index");
const { User, Product } = require("../db");
const jwt=require('jsonwebtoken')
const router = express.Router();


 

router.post('/signup', async (req, res) => {
    try {
      const { username, password,repassword } = req.body;
      if(password!=repassword){
        return res.json({message:'Retype password does not match'});
      }
      const user = await User.findOne({ username });
  
      if (user) {
        
        return res.json({ message: 'User already exists' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '12d' });
      res.json({ message: 'User created successfully', token });
    } catch (error) {
      console.error('Error during user signup:', error.message);
      res.status(500).json({ message: 'Server error during user signup' });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
  
      if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '12d' });
        res.json({ message: 'Logged in successfully', token });
      } else {
        res.status(403).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during user login:', error.message);
      res.status(500).json({ message: 'Server error during user login' });
    }
  });
  

  router.get('/products', authenticateJwt, async (req, res) => {
    try {
      const products = await Product.find({ published: true });
      res.json({ products });
    } catch (error) {
      console.error('Error fetching courses:', error.message);
      res.status(500).json({ message: 'Server error during course fetch' });
    }
  });

  
module.exports = router
