
const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

app.get(express.static(`${__dirname}/public`))

app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/tours/:id', tourRouter)

app.use('/api/v1/users', userRouter)    

module.exports = app