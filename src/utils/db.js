const mongoose = require('mongoose');
const url = process.env.DB

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  
 mongoose.connect(url, connectionParams)
  .then(() => {
    console.log(`Connected to Database`)
  }).catch((e) => {
    console.error('Error while connecting to the Database : ' + e);
  })
