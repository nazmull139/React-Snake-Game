const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000 ;
require('dotenv').config();

app.use(express.json({limit:"25mb"}));
//app.use(express.urlencoded({limit:"25mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))




//////all routess
const authRoutes = require('./src/users/user.route')


app.use("/api/auth",authRoutes);


main().then(()=>console.log("mongodb connected successfully")).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_URL);
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
  
  }
  
  
  app.get('/', (req, res) => {
    res.send('Hello World!') 
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`) 
  })