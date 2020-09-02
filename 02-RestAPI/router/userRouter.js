var express = require('express')
const router = express.Router()
const { create } = require('xmlbuilder2')
var User = require('../model/userModel')

const handleError = (err) => {
    let errors = { email: '', password: '' };

     // duplicate email error
     if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('Kullanici validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// Getting All with XML
router.get('/xml', async (req, res) => {
    try{
        const users = await User.find()
        var root = createFieldXML(users)
        var xml = root.end({ prettyPrint: true });
        res.status(200).send(xml)
    } catch(error){
        res.status(500).json({ message : error.message})
    }
})

// Getting One with XML
router.get('/xml/:id', getUser, async (req, res) => {
    try{
        var root = createFieldXML(res.user)
        var xml = root.end({ prettyPrint: true });
        res.status(200).send(xml)
    } catch(error){
        res.status(500).json({ message : error.message})
    }
})

// Getting all
router.get('/',  async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch(error){
        res.status(500).json({ message : error.message})
    }
})

// Getting One
router.get('/:id', getUser, async (req, res) => {
    res.json(res.user)
})

// Creating One
router.post('/', async (req, res) => {
    const {email, password} = req.body

    try {
        const user = new User({email : email,password : password})
        const newUser = await user.save()
        // status 201 means successfully created object
        // For example, you want to set an error status, and send a body with a JSON that explains why the error occured, you first have to set the status (using status), and then send the JSON (using send). If you had already set the status with sendStatus, it is no longer possible to send the JSON, because you already used a form of sent.
        res.status(201).json(newUser)
    } catch(error){
        // status 400 means something wrong with the user input and not something wrong server
        const errors = handleError(error)
        res.status(401).json({ error : errors})
    }
})

// Updating One
router.patch('/:id', getUser, async (req, res) => {

    res.user.email = req.body.email != null ? req.body.email : res.user.email
    res.user.password = req.body.password != null ? req.body.password : res.user.password

    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch(error){
        const errors = handleError(error)
        res.status(400).json({ error : errors})
    }
})

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
    try{
        const deletedUser = await res.user.remove()
        res.json({deletedUser})
    } catch(error){
        res.status(500).json({ message : error.message})
    }
})

async function getUser(req, res, next) {
    let user = null
    try{
        user = await User.findById(req.params.id)
        if (user == null) return res.status(404).json({message: "Cannot find user"})
    } catch(error){
        return res.status(500).json({ message : error.message})
    }

    res.user = user
    next()
}

function createFieldXML(data)
{
    data = data instanceof Array ? data : [data]
    const keys = Object.keys(data[0]['_doc'])

    var root = create().ele('users');

    data.forEach(function(user) { 

        user['_id'] = user['_id'].toString()
        user['createdAt'] = new Date(user['createdAt']).toLocaleString()
        
        var item = root.ele('user')

        for(const key of keys){
            item.ele(key).txt(user[key]).up()  
        }    
    })
   return root
}



module.exports = router