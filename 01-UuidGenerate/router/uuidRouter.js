const express = require('express')
const router = express.Router()
const uuid = require("uuid")


// express recognize the incoming Request Object as strings or arrays
router.use(express.urlencoded({
    extended: true
}))

// express to recognize the incoming Request Object as a JSON Object
router.use(express.json({
    extended: true
}))

// uuid get router
router.get('/', (req,res) =>{
    res.render("uuid", {uuids : getUUID()})
})

// uuid post router
router.post('/', (req,res) =>{
    const version = req.body.version
    const uuid = getUUID(version)

    res.json(({'success' : true, 'uuid': uuid})); 
})


var getUUID = (version) => {

    // undefined means get all versions instance in map
    if(version === undefined)
    {
        return new Map([
            [ "v1", generater.v1()],
            [ "v2", 'Version 2 not supported'],
            [ "v3", generater.v3()],
            [ "v4", generater.v4()], 
            [ "v5", generater.v5()],
        ])
    }

    // string name to function https://stackoverflow.com/questions/19433932/call-function-from-string-in-nodejs
    if (typeof global['generater'][version] === "function") {
        return global['generater'][version]()
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


module.exports = router