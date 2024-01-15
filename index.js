const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors=require('cors');


const userRouter=require("./routes/user");


const app=express();
app.use(cors({ origin: 'https://retailer-dashboard-frontend.vercel.app' }));
app.use(express.json());
app.use("/users",userRouter);


dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;


mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.snkyfeo.mongodb.net/Assignment`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Assignment'
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


  app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3000);
})





