const express = require('express')
const app = express()
const uuid = require("uuid")


module.exports = function(app){

    // express recognize the incoming Request Object as strings or arrays
    app.use(express.urlencoded({
        extended: true
    }))

    // express to recognize the incoming Request Object as a JSON Object
    app.use(express.json({
        extended: true
    }))

    // uuid get router
    app.get('/uuid', (req,res) =>{
        res.render("uuid", {uuids : getUUID()})
    })

    // uuid post router
    app.post('/uuid', (req,res) =>{
        const version = req.body.version
        const uuid = getUUID(version)

        return res.json(({'success' : true, 'uuid': uuid})); 
    })
}


var getUUID = (... params) => {

    if(params.length == 0)
    {
        return new Map([
            [ "v1", generater.v1()],
            [ "v2", 'Version 2 not supported'],
            [ "v3", generater.v3()],
            [ "v4", generater.v4()], 
            [ "v5", generater.v5()],
        ])
    }
    else if(params.length == 1){
        // string name to function https://stackoverflow.com/questions/19433932/call-function-from-string-in-nodejs
        if (typeof global['generater'][params] === "function") {
            return global['generater'][params]()
        }
    }

    return false
}

generater = {
    v1 : () =>{
        return uuid.v1() 
    },
    v3 : () => {
        return uuid.v3(Date() ,uuid.v3.URL)
    },
    v4 : () => {
        return uuid.v4() 
    },
    v5 : () => {
        return uuid.v5(Date(),uuid.v5.URL)
    },
}

