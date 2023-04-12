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

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    response.send({ message: "Invalid token" }).status(401);
  }

  const token = headerToken.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodeValue) => {  
      request.user = decodeValue.uid
      next()
    })
    .catch((e) => {
       
      response.send({ message: "Could not authorize", error : e }).status(403)
    });
}

module.exports = authMiddleware;