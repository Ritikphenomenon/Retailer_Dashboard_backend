const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

const SECRET = process.env.ACCESS_SECRET_KEY; 


const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          console.error('Error verifying JWT:', err.message);
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };


  



module.exports = {
    authenticateJwt,
    SECRET
}