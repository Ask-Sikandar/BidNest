
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');
const userRouter = require('./user');


router.post("/login", controllers.login);
router.post("/register", controllers.register);
router.post("/create-property", controllers.createproperty);
router.post("/search-property", controllers.searchProperty);
router.post("/view-property", controllers.viewProperty);

module.exports = router;