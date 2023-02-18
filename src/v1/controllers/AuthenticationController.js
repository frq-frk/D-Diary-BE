module.exports.createProfile = (req, res) => {
  new Promise(async (resolve, reject) => {
    const prof = new Profile({
      userId: req.user,
    })

    try {
      const savedProf = await prof.save()
      resolve(savedProf)
    } catch (e) {
      console.log('error creating user profile')
      reject(e)
    }
  })
    .then((obj) => {
      response.statusCode = 200
      response.send(obj)
    })
    .catch((e) => {
      response.statusCode = 500
      response.send(e)
    })
}

module.exports.updateProfile = async (request, response, next) => {
  const data = request.body
  Promise(async (resolve, reject) => {
    Profile.findOne({ userId: request.user })
      .then((obj) => {
        Profile.findByIdAndUpdate(obj._id, {
          profession: data.profession,
          bio: data.bio,
          weekGoal: data.weekGoal,
          monthGoal: data.monthGoal,
          shortTermGoal: data.shortTermGoal,
          longTermGoal: data.longTermGoal,
        })
          .then((updatedObj) => {
            resolve(updatedObj)
          })
          .catch((e) => {
            console.log(e)
            reject(e)
          })
      })
      .catch((e) => {
        console.log(e)
        reject(e)
      })
  })
    .then((obj) => {
      response.statusCode = 200
      response.send(obj)
    })
    .catch((e) => {
      response.statusCode = 500
      response.send(e)
    })
}

module.exports.getProfile = async (req, res) => {
  new Promise(async (resolve, reject) => {
    // try {
    //   const userProfile = Profile.findOne({ userId: UID })
    //   if (userProfile == null) {
    //     response.statusCode = 500
    //     response.send({ message: 'user does not exist' })
    //   }
    //   response.statusCode = 200
    //   response.send(obj)
    // } catch (e) {
    //   response.statusCode = 404
    //   response.send(e)
    // }
    // })
    Profile.findOne({ userId: req.user })
      .then((obj) => {
        resolve(obj)
      })
      .catch((e) => {
        reject(e)
      })
  })
    .then((obj) => {
      response.statusCode = 200
      response.send(obj)
    })
    .catch((e) => {
      response.statusCode = 404
      response.send(e)
    })
}
