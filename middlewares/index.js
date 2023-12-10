const express= require("express");
const router= express.Router();
const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
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
    });
}