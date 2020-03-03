import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyDfAqPNHtw4x-cql76K7Lwaur7xXaKmvjU",
    authDomain: "cis454hiddentreasure.firebaseapp.com",
    databaseURL: "https://cis454hiddentreasure.firebaseio.com",
    projectId: "cis454hiddentreasure",
    storageBucket: "cis454hiddentreasure.appspot.com",
    messagingSenderId: "808239440826",
    appId: "1:808239440826:web:e0f2b08ab6d2d1128e7383",
    measurementId: "G-JZV0MMBP55"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    // timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}