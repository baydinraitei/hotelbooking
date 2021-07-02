const express = require('express')
const router = express.Router()
const roomModel = require('../models/room')

/* https://api.monsuperhotel.com/users/59bfd752z */
router.get('/:id', async(request, response) => {
    try
    {
        let params = request.user.isAdmin ? { _id: request.params.id } : {_id: request.params.id, user: request.user._id }
        var room = await roomModel.findOne(params)
        response.json({room})
    }
    catch(e)
    {
        response.status(409).send({error: "The room doesn't exist"})
    }
})

/* https://api.monsuperhotel.com/users/ */
router.get('/', async (request, response) => {
    try{
        let params = request.user.isAdmin ? { } : { user: request.user._id }
        var rooms = await roomModel.find(params) //== "SELECT * from users"
        if(rooms.length == 0){
            response.status(409).send({error: "There is no room"})
        }else{
            response.status(200).send({ rooms })
        }
    }catch(e){
        response.status(409).send({error: "Format Error"})
    }
})

/* https://api.monsuperhotel.com/users/ */
router.post('/', async (request, response) => {
    let { body } = request
    try{
        if(request.user.isAdmin == false) { 
            response.status(409).send({error: "You're not able to post a room"}) 
        }
        else {
            var room = new roomModel(body)
            await room.save()
            response.status(200).send({ room })
        }
    }
    catch(e){
        response.status(409).send({error: "The id of the hotel doesn't exist"})
    }
})

/* https://api.monsuperhotel.com/users/59bfd752z */
router.put('/:id', async(request, response) => {
    try
    {
        let params = request.user.isAdmin ? { _id:request.params.id } : {_id:request.params.id, user: request.user._id }
        var room = await roomModel.findOneAndUpdate(params, request.body, {new:true})
        response.status(200).send()
    }
    catch(e)
    {
        response.status(409).send({error: "The room doesn't exist"})
    }
})

/* https://api.monsuperhotel.com/users/59bfd752z */
router.delete('/:id', async(request, response) => {
    try
    {
        let params = request.user.isAdmin ? { _id:request.params.id } : {_id:request.params.id, user: request.user._id }
        var room = await roomModel.findOneAndDelete(params)
        response.status(200).send()
    }
    catch(e)
    {
        response.status(409).send({error: "The room doesn't exist"})
    }
})

module.exports = router