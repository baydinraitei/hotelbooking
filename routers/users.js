const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const {checkToken} = require('../utils/token')

/* https://api.monsuperhotel.com/users/59bfd752z */
router.get('/:id', async(request, response) => {
    try
    {
        let params = request.user.isAdmin ? { _id: request.params.id } : {_id: request.params.id, user: request.user._id }
        console.log(params)
        var user = await userModel.findOne(request.params.id)
        response.status(200).send({ user })
    }
    catch(e)
    {
        response.status(409).send({error: "The user doesn't exist"})
    }
})

/* https://api.monsuperhotel.com/users/ */
router.get('/', checkToken, async (request, response) => {
    try
    {
        let params = request.user.isAdmin ? { } : { user: request.user._id }
        var users = await userModel.find() //== "SELECT * from users"
        if(users.length == 0)
        {
            response.status(409).send({error: "There is no user"})
        }
        else
        {
            response.status(200).send({ users })
        }
    }
    catch(e)
    {
        response.status(409).send({error: "Format Error"})
    }
})

/* https://api.monsuperhotel.com/users/ */
router.post('/', checkToken, async (request, response) => {
    let { body } = request
    try
    {
        var user = new userModel(body)
        await user.save()
        response.status(200).send({ user })
    }
    catch(e)
    {
        response.status(409).send({error:e.message})
    }
})

/* https://api.monsuperhotel.com/users/59bfd752z */
router.put('/:id', async(request, response) => {
    try
    {
        let params = request.user.isAdmin ? { _id:request.params.id } : {_id:request.params.id, user: request.user._id }
        var user = await userModel.findOneAndUpdate(request.params.id, request.body, {new:true})
        response.status(200).send({ hotels })
    }
    catch(e)
    {
        response.status(409).send({error: "The user doesn't exist"})
    }
})

/* https://api.monsuperhotel.com/users/59bfd752z */
router.delete('/:id', checkToken, async(request, response) => {
    try
    {
        let params = request.user.isAdmin ? { _id:request.params.id } : {_id:request.params.id, user: request.user._id }
        var user = await userModel.findOneAndDelete(params)
        response.status(200).send()
    }
    catch(e)
    {
        response.status(409).send({error: "The user doesn't exist"})
    }
})

module.exports = router