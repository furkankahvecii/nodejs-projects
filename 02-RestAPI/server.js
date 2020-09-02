require("dotenv").config()

var mongoose = require('mongoose')
var express = require('express')
var app = express()

app.use(express.json())

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => app.listen(3000, () => console.log("Server Started")))
.catch((error) => console.log(error)) 

var userRouter = require('./router/userRouter')
app.use('/users', userRouter)



//The difference between these two, is that devDependencies are modules which are only required during development, 
// while dependencies are modules which are also required at runtime.