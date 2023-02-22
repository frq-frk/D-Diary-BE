const { initializeApp, applicationDefault } = require('firebase-admin/app');
const admin = require('firebase-admin')
const app = initializeApp({
  credential: applicationDefault(),
});

function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization;

  if (!headerToken) {
    return response.send({ message: "No token provided" }).status(401);
  }

  if(! (req.headers.authorization && req.headers.authorization.startsWith('Bearer '))) {
    response.send({ message: "Invalid token" }).status(401);
 
  }   
  
  const token = req.headers.authorization.split(' ')[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodeValue) => {  
      // console.log(decodeValue)
      request.user = decodeValue.uid
      next()
    })
    .catch((e) => {
      console.log(e)
      response.send({ message: "Could not authorize" }).status(403)
    });
}

module.exports = authMiddleware;