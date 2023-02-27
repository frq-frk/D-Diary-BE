const mongoose = require('mongoose')
const { getCurrentYear, getCurrentMonthName } = require('../../utils/DateUtils')

const Profile = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  profession: {
    type: String,
  },
  bio: {
    type: String,
  },
  profession: {
    type: String,
  },

  joinMonth: {
    type: String,
    default: getCurrentMonthName(),
  },
  joinYear: {
    type: String,
    default: getCurrentYear(),
  },
  profession: {
    type: String,
  },
  bio: {
    type: String,
  },
  totalEntries: {
    type: Number,
    default: 0,
  },
  weekGoal: {
    type: String,
  },
  monthGoal: {
    type: String,
  },
  shortTermGoal: {
    type: String,
  },
  longTermGoal: {
    type: String,
  },
})

module.exports = mongoose.model('UserProfile', Profile)



function incrimentEntries(UID) {
  // console.log(UID)
  return new Promise(async (resolve, reject) => {
    Profile.findOne({ userId: UID })
      .then((obj) => {
        // console.log(obj)
        Profile.findByIdAndUpdate(obj._id, {
          $inc: { totalEntries: 1 },
        })
          .then((updatedObj) => {
            resolve(updatedObj)
          })
          .catch((e) => {
             
            reject(e)
          })
      })
      .catch((e) => {
         
        reject(e)
      })
  })
}

module.exports = {  incrimentEntries }
