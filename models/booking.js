const mongoose = require('mongoose')
const roomModel = require('./room')
const moment = require('moment')

var bookingSchema = new mongoose.Schema({
    
    rooms: {
        type: Array,
        required: true
    },
    arrivalDate: {
        type: String,
        required: true
    },
    departureDate: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

/* Calcul prix de la réservation */
bookingSchema.pre('save', async function (next) {
    let price = 0
    for(let i=0; i < this.rooms.length; i++){
        let room = await roomModel.findOne({_id:this.rooms[i]})
        price+= room.price
    }
    let arrival = moment(this.arrivalDate, 'YYYY-MM-DD')
    let departure = moment(this.departureDate, 'YYYY-MM-DD')
    this.arrivalDate = arrival
    this.departureDate = departure
    let duration = departure.diff(arrival, 'days')
    console.log(duration)
    if(duration > 0){
        this.price = price * duration
    }
    else
    {
        return next(new Error("Arrival date is greater than departure date"))
    }
    next()
})

/* Test si date de départ est inférieure à la date d'arrivée sur un update */
bookingSchema.pre('findOneAndUpdate', async function (next)
{
    let arrival = moment(this.arrivalDate, 'YYYY-MM-DD')
    let departure = moment(this.departureDate, 'YYYY-MM-DD')
    this.arrivalDate = arrival
    this.departureDate = departure
    let duration = departure.diff(arrival, 'days')
    if(duration <= 0)
    {
        return next(new Error('Arrival date is greater than departure date'))
    }
    else
    {
        next()
    }
})

var bookingModel = mongoose.model('booking', bookingSchema)

module.exports = bookingModel