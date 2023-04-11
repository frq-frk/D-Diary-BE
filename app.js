require('dotenv').config()
require('./src/utils/db')

const express = require('express')
const cors = require('cors')

const app = express()

const authMiddleware = require('./src/services/firebase/auth-middleware')
const routes = require('./src/v1/routes/index')

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
const port = process.env.PORT || 5000

app.use(authMiddleware)
app.use('/v1', routes)

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})
