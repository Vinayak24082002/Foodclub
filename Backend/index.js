const express = require("express");
const server = express();
const {User} =require('./models/user')
const PORT = process.env.PORT || 3000;
const userRouter=require('./routes/user')
const foodRouter=require('./routes/food')
const  { connectMongoDb } = require("./configs/connections.js");
const Food = require("./models/food.js");
const cors = require('cors');

server.use(cors({
  origin: 'http://localhost:3000' || 'http://localhost:5173', 
  credentials: true, 
}));
require("dotenv").config();

connectMongoDb("foodclub");
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use("/user",userRouter)
server.use("/food",foodRouter)

server.get("/",  (req, res)=> {
  res.send("Home page");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
