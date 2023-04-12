require('dotenv').config()
require('./src/utils/db')

const compression = require("compression");
const helmet = require("helmet");

const express = require('express')
const cors = require('cors')

var RateLimit = require("express-rate-limit");

const app = express()

app.use(compression()); //compressor that compressos responses to improve performance
app.use(helmet()); //library to protect app from well know vulnerablities

// Set up rate limiter: maximum of twenty requests per minute
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

const authMiddleware = require('./src/services/firebase/auth-middleware')
const routes = require('./src/v1/routes/index')

// Apply rate limiter to all requests
app.use(limiter);

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
const port = process.env.PORT || 5000

app.use(authMiddleware)
app.use('/v1', routes)

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})
