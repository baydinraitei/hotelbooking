const { request } = require('express')
const mongoose = require('mongoose')
const roomModel = require('./room')

var hotelSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    furnitures: {
        type: Array,
        required: true
    },
    location: {
        type: Object,
        required: true
    }

})

/* Suppression de la totalité des chambres quand l'hôtel est supprimé */
hotelSchema.post('findOneAndDelete', async function (doc) {

    await roomModel.deleteMany({hotels:doc._id})

})

/* Vérification si un hôtel existe déjà aux coordonnées saisies */
hotelSchema.pre('save', async function (next){
    
    let coordinates = this.location.coordinates
    console.log(coordinates)
    let hotel = await hotelModel.findOne({"location.coordinates" : coordinates})
    console.log(hotel)
    if(hotel) return next(new Error('Hotel already exists'))
    else next()

})

var hotelModel = mongoose.model('hotel', hotelSchema)

module.exports = hotelModel