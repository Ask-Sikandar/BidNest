const express= require("express");
const router= express.Router();
const jwt = require('jsonwebtoken');
const controllers= require("../controllers/bids.js");
const verifyToken= require("../middlewares/verifyToken.js");


  
  // POST /bid/place - Route Handler
  router.post('/place-bid', verifyToken, controllers.placeBid); // Using the controller function
  router.post('/cancel-bid/:bidID', verifyToken, controllers.cancelBid);

  module.exports = router;