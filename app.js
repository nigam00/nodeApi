const express = require('express')
const app = express();
const mongoose = require('mongoose')
const morgan = require("morgan");
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const expressValidator = require('express-validator')
var cookerParser = require('cookie-parser')
dotenv.config()

//db
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>console.log('DB Connected'))

mongoose.connection.on('error',err=>{
	console.log(`DB connection error : $ {err.message}`)
})
//bring in routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookerParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:'Unauthorized'});
  }
});

const port = process.env.PORT || 9000;
app.listen(port,()=>{
	console.log(`A Node js api is listning on port : ${port}`);
});