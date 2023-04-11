const routes = require('express').Router()

routes.use('/user', require('./AuthenticationRoute'))
routes.use('/dairy', require('./DairyRoutes'))

module.exports = routes
