const express = require('express')
const router = express.Router()
const hotelModel = require('../models/hotel')

/* https://api.monsuperhotel.com/users/59bfd752z */
router.get('/:id', async(request, response) => {
    try{
        let params = request.user.isAdmin ? { _id: request.params.id } : {_id: request.params.id, user: request.user._id }
        var hotel = await hotelModel.findOne(params)
        response.status(200).send({ hotel })
    }
    catch(e){
        response.status(409).send({error: "The hotel doesn't exist"})
    }
})

/* https://api.monsuperhotel.com/users/ */
router.get('/', async (request, response) => {
    try
    {
        let params = request.user.isAdmin ? {  } : { user: request.user._id }
        var hotels = await hotelModel.find(params) //== "SELECT * from users"
        if(hotels.length == 0){
            response.status(409).send({error: "There is no hotel"})
        }else{
            response.status(200).send({ hotels })
        }
    }
    catch(e)
    {
        response.status(409).send({error: "Format Error"})
    }
})

/* https://api.monsuperhotel.com/users/ */
router.post('/', async (request, response) => {
    let { body } = request
    try{
        if(request.user.isAdmin == false)
        {
            response.status(409).send({error: "You're not able to post a hotel"}) 
        }
        else
        {
            var hotel = new hotelModel(body)
            await hotel.save()
            response.status(200).send({ hotel })
        }
    }
    catch(e){
        response.status(409).send({error:e.message})
    }
    
})

/* https://api.monsuperhotel.com/users/59bfd752z */
router.put('/:id', async(request, response) => {
    try
    {
        let params = request.user.isAdmin ? { _id:request.params.id } : {_id:request.params.id, user: request.user._id }
        var hotels = await hotelModel.findOneAndUpdate(params, request.body, {new:true})
        response.status(200).send({ hotels })
    }
    catch(e)
    {
        response.status(409).send({error: "The hotel doesn't exist"})
    }

})

/* https://api.monsuperhotel.com/users/59bfd752z */
router.delete('/:id', async(request, response) => {
    try
    {
        let params = request.user.isAdmin ? { _id:request.params.id } : {_id:request.params.id, user: request.user._id }
        var hotel = await hotelModel.findOneAndDelete(params)
        response.status(200).send()
    }
    catch(e)
    {
        response.status(409).send({error: "The hotel doesn't exist"})
    }

})

module.exports = router