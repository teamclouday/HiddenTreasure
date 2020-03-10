const functions = require('firebase-functions')
const admin = require('firebase-admin')
const adminKey = require('./admin.json')

admin.initializeApp({
    credential: admin.credential.cert(adminKey),
    databaseURL: "https://cis454finalproject.firebaseio.com"
})
const db = admin.firestore()

// update item basic information
// 1. id array
exports.updateBasics = functions.firestore
    .document("items/{item_id}")
    .onWrite((snap, context) => {
        // const newId = [];
        // db.collection("items_data").doc("ids").get().then((snap) => {
        //     let ids = snap.data().ids
        //     ids.push(newId)
        //     db.collection("items_data").doc("ids").set({'ids':ids}).catch(err => {
        //         console.log(err)
        //     })
        // }).catch(err => {
        //     console.log(err)
        // })
        console.log(snap.data())

        console.log(context.params.item_id)
})