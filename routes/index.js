const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const bidRouter=require('./bid')

router.get('/', (req,res) => {
    res.send("Hello World");
});
router.use("/user", userRouter);
router.use("/bid",bidRouter);


module.exports = router;