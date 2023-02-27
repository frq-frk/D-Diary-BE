const route = require('express').Router()

const {
  createEntry,
  getEntry,
  getEntryByMonthYear,
  getEntryOfToday,
} = require('../model/DiaryEntry')
const { books } = require('../../constants/ArrayConstants')

route.get('/books', (request, response) => {
  return response.send({ books })
})

route.post('/entry', (request, response) => {
  const data = request.body
  createEntry(request.user, data)
    .then((obj) => response.send(obj))
    .catch((e) => {
      response.statusCode = 500
      response.send(e)
    })
})

route.get('/entry', (request, response) => {
  getEntry(request.user)
    .then((obj) => {
      if (obj.msg || obj.message) response.statusCode = 404
      else response.statusCode = 200
      response.send(obj)
    })
    .catch((e) => {
      response.statusCode = 500
      response.send(e)
    })
})

route.get('/entrybymonth', (request, response) => {
  console.log(request.query)
  getEntryByMonthYear(request.user, request.query.month, request.query.year)
    .then((obj) => {
      if (obj.msg || obj.message) response.statusCode = 404
      else response.statusCode = 200
      response.send(obj)
    })
    .catch((e) => {
      response.statusCode = 500
      response.send(e)
    })
})

route.get('/entrybytoday', (request, response) => {
  getEntryOfToday(request.user)
    .then((obj) => {
      if (obj.msg || obj.message) response.statusCode = 404
      else response.statusCode = 200
      response.send(obj)
    })
    .catch((e) => {
      response.statusCode = 500
      response.send(e)
    })
})

module.exports = route
