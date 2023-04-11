const route = require('express').Router()
const {
  createProfile,
  updateProfile,
  getProfile,
  incrementEntries
} = require('../controllers/AuthenticationController')

route.post('/create-profile', createProfile)
route.put('/update-profile', updateProfile)
route.get('/get-profile', getProfile)
route.put('/incrementEntries', incrementEntries)

module.exports = route
