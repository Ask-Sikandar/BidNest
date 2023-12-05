const express= require("express");
const router= express.Router();
const jwt = require('jsonwebtoken');
const controllers= require("../controllers/bids.js");


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.decoded = decoded; // Attach decoded token data to the request object
      next();
    });
  };
  
  // POST /bid/place - Route Handler
  router.post('/place-bid', verifyToken, controllers.placeBid); // Using the controller function
  
  module.exports = router;