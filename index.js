const express = require('express');
require('dotenv').config()
const cors = require('cors')
const { db } = require('./db')

const { createEntry, getEntry, getEntryByMonthYear } = require('./model/DiaryEntry')

const authMiddleware = require('./firebase/auth-middleware')

const app = express();
app.use(cors())
app.use(
  express.urlencoded({ extended: true })
);

app.use(express.json());
const port = process.env.PORT || 5000;

const books = [
  {
    date: "17-01-2023",
    entry: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  },
  {
    date: "16-01-2023",
    entry: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  },
  {
    date: "15-01-2023",
    entry: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    date: "17-01-2023",
    entry: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  },
  {
    date: "16-01-2023",
    entry: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  },
  {
    date: "15-01-2023",
    entry: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
];

app.use(authMiddleware)

app.get("/books", (request, response) => {
  return response.send({ books });
});

app.post("/entry", (request, response) => {
  const data = request.body;
  createEntry(request.user, data)
    .then((obj) => response.send(obj))
    .catch((e) => {
      console.log(e)
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
      console.log(e)
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
      console.log(e)
      response.statusCode = 500
      response.send(e)
    })
})

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
})
