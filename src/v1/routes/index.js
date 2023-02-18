const routes = require('express').Router()

routes.use('/user', require('./AuthenticationRoute'))

module.exports = routes
