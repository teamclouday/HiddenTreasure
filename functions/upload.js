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
   let ids = []
   Object.keys(data).forEach(docKey => {
      delete data[docKey]["Item URL Label (image)"]
      firestore.collection(collectionKey).add(data[docKey]).then((res) => {
         ids.push(res.id)
         console.log("Document " + data[docKey]["Item Name"] + " successfully written!")
         finish(ids)
      }).catch((error) => {
         console.error("Error writing document: ", error)
      })
   })
}

function finish(ids)
{
   if(ids.length == 50)
   {
      console.log("done")
      firestore.collection("items_data").doc("ids").set({"ids" : ids}).catch(err => {
         console.log(err)
      })
   }
}