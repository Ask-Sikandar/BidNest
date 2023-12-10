const express= require("express");
const router= express.Router();
const jwt = require('jsonwebtoken');
const controllers= require("../controllers/bids.js");
const middlewares = require("../middlewares/index.js");


  
  // POST /bid/place - Route Handler
  router.post('/place-bid', middlewares.authenticateToken, controllers.placeBid); // Using the controller function
//   router.post('/cancel-bid/:bidID', controllers.cancelBid);

  module.exports = router;