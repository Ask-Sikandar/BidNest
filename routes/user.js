
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');
const userRouter = require('./user');
const verifyToken = require('../middlewares/verifyToken');


router.post("/login", controllers.login);
router.post("/register", controllers.register);
router.post("reset-password", verifyToken,controllers.resetPassword);
router.post('/edit-profile',verifyToken,controllers.editProfile);
module.exports = router;