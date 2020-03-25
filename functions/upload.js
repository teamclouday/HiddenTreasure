const admin = require('firebase-admin')
const serviceAccount = require("./admin.json")
const data = require("./sheet.json")
const collectionKey = "items"
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cis454finalproject.firebaseio.com"
})
const firestore = admin.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)
let i = 1
if (data && (typeof data === "object")) {
   let ids = {}
   let date = new Date()
   let i = 0
   Object.keys(data).forEach(docKey => {
      delete data[docKey]["Item URL Label (image)"]
      data[docKey]["Item Rating"] = 0
      data[docKey]["Item Raters Count"] = 0
      data[docKey]["Item Raters Ids"] = []
      data[docKey]["Item Owner ID"] = "5oYqWErgk5TaTWwMYONKFwxmYaq2"
      data[docKey]["Item Comments"] = []
      firestore.collection(collectionKey).add(data[docKey]).then((res) => {
         ids[res.id] = date.getTime() + i * 5000
         console.log("Document " + data[docKey]["Item Name"] + " successfully written!")
         finish(ids)
         i++
      }).catch((error) => {
         console.error("Error writing document: ", error)
      })
   })
}

function finish(ids)
{
   if(Object.keys(ids).length == 50)
   {
      console.log("done")
      firestore.collection("users").doc("5oYqWErgk5TaTWwMYONKFwxmYaq2").update({
         "items_sell" : ids
      }).catch(err => {
         console.log(err.message)
      })
   }
}