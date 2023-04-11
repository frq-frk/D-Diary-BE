const route = require('express').Router()
const {
  createProfile,
  updateProfile,
  getProfile,
  incrementEntries
} = require('../controllers/AuthenticationController')

route.use('/create-profile', createProfile)
route.use('/update-profile', updateProfile)
route.use('/get-profile', getProfile)
route.use('/incrementEntries', incrementEntries)

module.exports = route
