require('dotenv').config()
require('./src/utils/db')


const express = require('express');
const cors = require('cors')

const { createEntry, getEntry, getEntryByMonthYear, getEntryOfToday } = require('./src/v1/model/DiaryEntry')
const { createProfile, updateProfile, getProfile, incrimentEntries} = require('./src/v1/model/UserProfile') 

const authMiddleware = require('./src/services/firebase/auth-middleware');
const { request, response } = require('express');

const routes = require('./src/v1/routes/index')

const app = express();
app.use(cors())
app.use(
  express.urlencoded({ extended: true })
);


app.use(express.json());
const port = process.env.PORT || 5000;


app.use(authMiddleware)
app.use('/v1', routes)

app.get("/books", (request, response) => {
  return response.send({ books });
});

app.post("/entry", (request, response) => {
  const data = request.body;
  createEntry(request.user, data)
    .then((obj) => response.send(obj))
    .catch((e) => {
       
      response.statusCode = 500
      response.send(e)
    })
})

app.get("/entry", (request, response) => {
  getEntry(request.user)
    .then((obj) => {
      if (obj.msg || obj.message)
        response.statusCode = 404
      else
        response.statusCode = 200
      response.send(obj)
    })
    .catch((e) => {
       
      response.statusCode = 500
      response.send(e)
    })
})

app.get("/entrybymonth", (request, response) => {
  console.log(request.query)
  getEntryByMonthYear(request.user, request.query.month, request.query.year)
    .then((obj) => {
      if (obj.msg || obj.message)
        response.statusCode = 404
      else
        response.statusCode = 200
      response.send(obj)
    })
    .catch((e) => {
      response.statusCode = 500
      response.send(e)
    })
})

app.get("/entrybytoday", (request, response) => {
  getEntryOfToday(request.user)
    .then((obj) => {
      if (obj.msg || obj.message)
        response.statusCode = 404
      else
        response.statusCode = 200
      response.send(obj)
    })
    .catch((e) => {
      response.statusCode = 500
      response.send(e)
    })
})

app.post("/userprofile", (request, response) => {
  createProfile(request.user)
  .then((obj) => {
    response.statusCode = 200
    response.send(obj)
  }).catch((e) => {
    response.statusCode = 500
    response.send(e)
  })
})


app.put("/incremententries", (request, response) => {
  // console.log(request.user)
  incrimentEntries(request.user)
  .then((obj) => {
    response.statusCode = 200;
    response.send(obj);
  })
  .catch((e) => {
    response.statusCode = 404;
    response.send(e);
  })
})

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
})
