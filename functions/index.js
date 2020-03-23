// const functions = require('firebase-functions')
// const admin = require('firebase-admin')
// const adminKey = require('./admin.json')

// admin.initializeApp({
//     credential: admin.credential.cert(adminKey),
//     databaseURL: "https://cis454finalproject.firebaseio.com"
// })
// const db = admin.firestore()

// // update item basic information
// // 1. id array
// exports.updateBasics = functions.firestore
//     .document("items/{item_id}")
//     .onWrite((snap, context) => {
//         // const newId = [];
//         // db.collection("items_data").doc("ids").get().then((snap) => {
//         //     let ids = snap.data().ids
//         //     ids.push(newId)
//         //     db.collection("items_data").doc("ids").set({'ids':ids}).catch(err => {
//         //         console.log(err)
//         //     })
//         // }).catch(err => {
//         //     console.log(err)
//         // })
//         console.log(snap.data())

//         console.log(context.params.item_id)
// })

const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch')

const env = functions.config()

const client = algoliasearch(env.algolia.appid, env.algolia.apikey)
const itemsIndex = client.initIndex(`items`) // <-- Index name

exports.algoliaItemSync = functions
  .firestore.document(`items/{doc}`).onWrite(async (change, _context) => {
    const oldData = change.before
    const newData = change.after
    const data = newData.data()
    const objectID = newData.id // <-- prop name is important

    if (!oldData.exists && newData.exists) {
        // creating
        return itemsIndex.saveObject(Object.assign({}, {
          objectID
        }, data))
      } else if (!newData.exists && oldData.exists) {
        // deleting
        return itemsIndex.deleteObject(objectID)
      } else  {
        // updating
        return itemsIndex.saveObject(Object.assign({}, {
          objectID
        }, data))
    }
})