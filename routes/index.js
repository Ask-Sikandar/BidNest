const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const adminRouter = require('./admin');
const path = require('path');
const bidRouter = require('./bids')
const publicDirectoryPath = path.join(__dirname, '../public');

router.get('/', (req,res) => {
    // res.render('<h1>thisi is</h1>')
    res.sendFile(path.join(publicDirectoryPath, '/index.html'));
});
router.use("/user", userRouter);
router.use("/bids", bidRouter);
router.use("/admin", adminRouter);



module.exports = router;