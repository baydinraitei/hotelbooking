const mongoose = require('mongoose')
const hotelModel = require('./hotel')

var roomSchema = new mongoose.Schema({

    hotels: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    numRoom: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    nbBed: {
        type: Number,
        required: true
    },
    furnitures: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})

/** Erreur sur prix de la chambre si inférieur ou égal à 0 */
roomSchema.pre('save', async function(next)
{
    if(this.price <= 0)
    {
        return next(new Error('The room need a price to be registered or greater than 0 €'))
    }
})

roomSchema.pre('save', async function(next)
{
    if(this.floor <= 0 || this.nbBed <= 0)
    {
        return next(new Error('This data cannot be lesser than 0'))
    }
})

var roomModel = mongoose.model('room', roomSchema)

module.exports = roomModel