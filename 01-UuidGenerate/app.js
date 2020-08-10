const express = require('express')
const app = express()
const uuidController = require('./router/uuidRouter')

// set up template engine
app.set("view engine","ejs")

// static files
app.use(express.static("./public"))

// uuid router
app.use('/uuid',uuidController)

// automatic orientation
app.use('*', (req,res)=>{
    res.redirect('http://localhost:3000/uuid');
})

// listen to port
app.listen(3000 , () => { console.log("Server started...")})