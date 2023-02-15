const mongoose = require('mongoose');
const { getCurrentYear, getCurrentMonthName } = require('../DateUtils')

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
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
        default: 0
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
    }
})

const Profile = mongoose.model('UserProfile', ProfileSchema);

function createProfile(UID) {
    return new Promise(async (resolve, reject) => {
        const prof = new Profile({
            userId: UID
        })

        try {
            const savedProf = await prof.save()
            resolve(savedProf)
        } catch (e) {
            console.log("error creating user profile")
            reject(e)
        }
    })
}

function updateProfile(UID, dataObj) {
    return new Promise(async (resolve, reject) => {
        Profile.findOne({ userId: UID })
            .then((obj) => {
                Profile.findByIdAndUpdate(obj._id, {
                    profession: dataObj.profession,
                    bio: dataObj.bio,
                    weekGoal: dataObj.weekGoal,
                    monthGoal: dataObj.monthGoal,
                    shortTermGoal: dataObj.shortTermGoal,
                    longTermGoal: dataObj.longTermGoal
                }).then((updatedObj) => {
                    resolve(updatedObj)
                }).catch((e) => {
                    console.log(e)
                    reject(e);
                })
            }).catch((e) => {
                console.log(e)
                reject(e);
            })
    })
}

function getProfile(UID) {
    return new Promise(async (resolve, reject) => {
        Profile.findOne({ userId: UID })
            .then((obj) => {
                resolve(obj)
            }).catch((e) => {
                reject(e)
            })
    })
}

function incrimentEntries(UID) {
    // console.log(UID)
    return new Promise(async (resolve, reject) => {
        Profile.findOne({ userId: UID })
            .then((obj) => {
                // console.log(obj)
                Profile.findByIdAndUpdate(obj._id, {
                    $inc: {totalEntries : 1}
                }).then((updatedObj) => {
                    resolve(updatedObj)
                }).catch((e) => {
                    console.log(e)
                    reject(e);
                })
            }).catch((e) => {
                console.log(e)
                reject(e);
            })
    })
}

module.exports = { createProfile, updateProfile, getProfile, incrimentEntries };