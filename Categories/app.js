const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const categoryRoute = require('./routes/categoryRoutes')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_DATA)
const db = mongoose.connection

db.on("error",(err) =>{
    console.log(err);
})

db.once("open",() =>{
    console.log("Database is Connected");
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

 
app.use('/api/categories',categoryRoute)
const PORT = process.env.Port || 9999
app.listen(PORT,() => console.log(`Server is running @ ${PORT} `));