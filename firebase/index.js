const firebase = require("firebase-admin");

const firebaseConfig = require("../fire-base-config.json");

firebase.initializeApp({
  credential: firebase.credential.cert(firebaseConfig),
});

module.exports = firebase;