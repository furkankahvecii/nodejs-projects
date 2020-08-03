const express = require('express')
const app = express()
const uuidController = require('./controllers/uuidController')

// set up template engine
app.set("view engine","ejs")

// static files
app.use(express.static("./public"))

//fire controllers
uuidController(app)

// listen to port
app.listen(3000 , () => { console.log("Server started...")})