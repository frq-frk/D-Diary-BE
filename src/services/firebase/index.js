const firebase = require("firebase-admin");

const credentials = require("./firebase");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
});

module.exports = firebase;