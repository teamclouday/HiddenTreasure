import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyBoVUvlWqzgv0HLUWQXem9ByF44gjsKEk0",
    authDomain: "cis454finalproject.firebaseapp.com",
    databaseURL: "https://cis454finalproject.firebaseio.com",
    projectId: "cis454finalproject",
    storageBucket: "cis454finalproject.appspot.com",
    messagingSenderId: "151765129580",
    appId: "1:151765129580:web:7f873db2d49fa6ff037b49",
    measurementId: "G-MCN0H88F6E"
}
firebase.initializeApp(config)
firebase.analytics()

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