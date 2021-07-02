const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const {createToken} = require('../utils/token')

/* https://api.monsuperhotel.com/login */
router.get('/:id', async(request, response) => {
    try{
        const user = await userModel.findOne({_id: request.params.id})
        response.status(200).send({ user })
    }
    catch(e)
    {
        response.status(409).send({error: "The user doesn't exist"})
    }
})


router.post('/:id', async(request, response) => {
    let user = await userModel.findOne({_id: request.params.id})
    if(user.password === request.body.password){
        const token = createToken(user)
        response.status(200).send({token})
    }
    else{
        response.status(409).send({error: "User not found"})
    }
})

module.exports = router