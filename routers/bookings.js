const express = require('express')
const router = express.Router()
const bookingModel = require('../models/booking')
const {checkToken} = require('../utils/token')

/* https://api.monsuperhotel.com/users/59bfd752z */
router.get('/:id', checkToken, async(request, response) => {
    try{
        let params = request.user.isAdmin ? { _id: request.params.id } : { _id: request.params.id, user: request.user._id }
        var booking = await bookingModel.findOne(params)
        response.status(200).send({ booking })
    }
    catch(e)
    {
        response.status(409).send({error: "The booking doesn't exist"})
    }
})

/* https://api.monsuperhotel.com/bookings/ */
router.get('/', checkToken, async (request, response) => {
    try
    {
        let params = request.user.isAdmin ? { } : { user: request.user._id }
        var bookings = await bookingModel.find(params) //== "SELECT * from users WHERE ..."
        if(bookings.length == 0){
            response.status(409).send({error: "There is no booking"})
        }else{
            response.status(200).send({ bookings })
        }
    }
    catch(e)
    {
        response.status(409).send({error: "Format Error"})
    }
})

/* https://api.monsuperhotel.com/bookings/ */
router.post('/', checkToken, async (request, response) => {
    try
    {
        let data = request.body
        data.user = request.user._id
        var booking = new bookingModel(data)
        await booking.save()
        response.json({ booking })
    }
    catch(e)
    {
        response.status(409).send({error: "Format error"})
    }
})

/* https://api.monsuperhotel.com/bookings/59bfd752z */
router.put('/:id', checkToken, async(request, response) => {
    try{
        let params = request.user.isAdmin ? { _id:request.params.id } : {_id:request.params.id, user: request.user._id }
        let data = request.body
        data.user = params
        var booking = await bookingModel.findOneAndUpdate(params, data, {new:true})
        response.status(200).send({ booking })
    }catch(e)
    {
        response.status(409).send({error: "The booking doesn't exist"})
    }
})

/* https://api.monsuperhotel.com/users/59bfd752z */
router.delete('/:id', checkToken, async(request, response) => {
    try
    {
        let params = request.user.isAdmin ? { _id:request.params.id } : {_id:request.params.id, user: request.user._id }
        var booking = await bookingModel.findOneAndDelete(params)
        response.status(200).send()
    }catch(e)
    {
        response.status(409).send({error: "The booking doesn't exist"})
    }
})

module.exports = router