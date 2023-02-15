const e = require('express');
const mongoose = require('mongoose');
require('./../db')
const { getCurrentDate } = require('../DateUtils')

function createDiaryEntry(collectionName) {
    const EntrySchema = new mongoose.Schema({
        date: {
            type: String,
            default: getCurrentDate('-'),
            required : true,
        },
        entry: {
            type: String,
            trim: true,
            required: true
        },
        tags: {
            type: [String],
            enum: ["Special Day", "Event Day", "Party Day", "Sad Day", "Happy Day", "Memorable Day"]
        },
        snaps: {
            type: [String]
        }
    });
    try {
        collectionName = mongoose.model(collectionName, EntrySchema)
    } catch (e) {
        collectionName = mongoose.model(collectionName)
    }
    return collectionName;
}

const createEntry = (cName, dataObject) => {

    return new Promise(async (resolve, reject) => {

        let entryCollection = createDiaryEntry(cName);

        try {
            let obj = new entryCollection(dataObject);
            obj.save();
            resolve(obj)
        } catch (e) {
            reject(e)
        }
    })
}

const getEntry = (cName) => {
    return new Promise(async (resolve, reject) => {

        let entryCollection = createDiaryEntry(cName);

        try {
            let obj = await entryCollection.find()
            if(obj.length === 0)
                resolve({"msg":"There are no entries"})
            else
            resolve(obj)
        } catch (e) {
            reject(e)
        }
    })
}

const getEntryByMonthYear = (cName, month, year) => {
    return new Promise(async (resolve, reject) => {
        let entryCollection = createDiaryEntry(cName);

        const exp = `^${year}-${month}-`;
        console.log(exp)
        try {
            let obj = await entryCollection.find({date : new RegExp(exp)})
            if(obj.length === 0)
                resolve({"msg":"There are no entries"})
            else
            resolve(obj)
        } catch (e) {
            reject(e)
        }
    })
}

const getEntryOfToday = (cName) => {
    return new Promise(async (resolve, reject) => {
        let entryCollection = createDiaryEntry(cName);
        const exp = getCurrentDate('-');
        try{
            let obj = await entryCollection.find({date:exp})
            if(!obj)
                reject({"msg" : "Empty"})
            else
                resolve(obj)
        }catch(e){
            reject(e)
        }
    })
}

module.exports = { createEntry, getEntry, getEntryByMonthYear, getEntryOfToday }