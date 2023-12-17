
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');
const userRouter = require('./user');
const jwt = require('jsonwebtoken');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename for uploaded files
    }
  });
const upload = multer({ storage: storage });

function authenticateToken(req, res, next) {
    const authHeader =  req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split('.')[1];

    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
        return res.status(403).json({ message: 'Token expired/ Invalid' });
        }
        // req.user = user;
        console.log(user)
        req.body.user = user;
        next();
    })
}

router.post("/login", controllers.login);
router.post("/register", controllers.register);
router.post("/create-property", authenticateToken, controllers.createproperty);
router.post("/search-property", authenticateToken, controllers.searchProperty);
router.post("/view-property", authenticateToken, controllers.viewProperty);
router.post("/upload-pictures", authenticateToken, upload.array('images',6), controllers.uploadPictures);
router.post("/view-profile", authenticateToken, controllers.viewProfile);
router.post("/my-listings", authenticateToken, controllers.myListings);
//get contact info api for approved bids
//accept bid
//reject bid
//mybids: approved, unapproved, pending 3 apis
//view bids on my listing
//
module.exports = router;