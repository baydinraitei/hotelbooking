const express = require('express')
const routerUsers = require('./routers/users')
const routerHotels = require('./routers/hotels')
const routerRooms = require('./routers/rooms')
const routerBookings = require('./routers/bookings')
const routerAuthentication = require('./routers/authentication')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { eventNames } = require('./models/user')
const salt = 10

mongoose.Promise = Promise
mongoose.connect('mongodb+srv://dbuser:0O1GmKF1jB3ZN4n1@cluster0.5mcnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection
db.on('error', console.error.bind(console, "connection error: "))
db.once('open', () => console.log('status:', db.states[db._readyState]))

var app = express()

app.use(express.json())
app.use('/users', routerUsers)
app.use('/hotels', routerHotels)
app.use('/rooms', routerRooms)
app.use('/bookings', routerBookings)
app.use('/login', routerAuthentication)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on ', PORT)
})