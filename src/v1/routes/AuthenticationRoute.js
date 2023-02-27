const route = require('express').Router()
const {
  createProfile,
  updateProfile,
  getProfile,
} = require('../controllers/AuthenticationController')

route.use('/create-profile', createProfile)
route.use('/update-profile', updateProfile)
route.use('/get-profile', getProfile)

module.exports = route
