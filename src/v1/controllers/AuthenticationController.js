const Profile = require('../model/UserProfile')

module.exports.createProfile = async (request, response) => {

  const prof = new Profile({
    userId: request.user,
  })
  try {
    const savedProf = await prof.save()
    response.statusCode = 200
    console.log(savedProf)
    return response.send(savedProf)
  } catch (error) {
    console.log(error)
    response.statusCode = 404
    return response.send({ status: false, message: 'error creating user profile' })
  }
}

module.exports.updateProfile = async (request, response) => {
  const data = request.body

  try {
    const userProfile = await Profile.findOne({ userId: request.user })
    if (userProfile == null) {
      response.statusCode = 500
      return response.send({ message: 'user does not exist' })
    }
    const updatedProfile = await Profile.findByIdAndUpdate(userProfile._id, {
      profession: data.profession,
      bio: data.bio,
      weekGoal: data.weekGoal,
      monthGoal: data.monthGoal,
      shortTermGoal: data.shortTermGoal,
      longTermGoal: data.longTermGoal,
    })
    response.statusCode = 200
    return response.send(updatedProfile)
  } catch (error) {
    response.statusCode = 404
    return response.send(error.message)
  }
}

module.exports.getProfile = async (request, response) => {
  try {
    const userProfile = await Profile.findOne({ userId: request.user })
    if (userProfile == null) {
      response.statusCode = 500
      return response.send({ message: 'user does not exist' })
    }
    response.statusCode = 200
    return response.send(userProfile)
  } catch (e) {
    response.statusCode = 404
    return response.send({ status: false, message: e.message })
  }
}

module.exports.incrementEntries = async (request, response) => {
  try {
    const userProfile = await Profile.findOne({ userId: request.user })
    if (userProfile == null) {
      response.statusCode = 500
      response.send({ message: 'user does not exist' })
    }
    const updatedProfile = await Profile.findByIdAndUpdate(userProfile._id, {
      $inc: { totalEntries: 1 },
    })
    response.statusCode = 200
    return response.send(updatedProfile)
  } catch (e) {
    response.statusCode = 404
    return response.send({ status: false, message: e.message })
  }
}
