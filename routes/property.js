const express= require("express");
const router= express.Router();
const jwt = require('jsonwebtoken');
const controllers= require("../controllers/properties.js");
const verifyToken = require("../middlewares/verifyToken.js");

router.post("/create-property", verifyToken, controllers.createProperty);


module.exports = router;