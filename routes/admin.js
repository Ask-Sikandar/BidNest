const express = require('express');
const router = express.Router();
const controllers = require('../controllers/admin');
const userRouter = require('./user');
const jwt = require('jsonwebtoken');


router.post("/view-users", controllers.viewUsers);

module.exports = router;