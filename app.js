require('dotenv').config();
const express= require('express');
const router = require('./routes/index');
const db = require('./config');
const cors = require('cors');

const app=express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static('uploads'));
app.use("/", router);
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("server has started on port ", PORT);
})