const express= require("express");
const router= express.Router();
const jwt = require('jsonwebtoken');
const controllers= require("../controllers/bids.js");


  
  // POST /bid/place - Route Handler
  router.post('/place-bid', controllers.placeBid); // Using the controller function
//   router.post('/cancel-bid/:bidID', controllers.cancelBid);

  module.exports = router;