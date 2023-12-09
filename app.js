require('dotenv').config();
const express= require('express');
const router = require('./routes/index');
const db = require('./config');

const app=express();
host = process.env.DB_HOST;
app.use(express.json());
app.use("/", router);
console.log(host);
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("server has started on port ", PORT);
})