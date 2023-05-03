import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";



const firebaseConfig = {
    apiKey: "AIzaSyB333BSRpIP69cmjnmQ9-dlQotdVh_olQo",
    authDomain: "react-firebase-auth-74f9e.firebaseapp.com",
    projectId: "react-firebase-auth-74f9e",
    storageBucket: "react-firebase-auth-74f9e.appspot.com",
    messagingSenderId: "987455676402",
    appId: "1:987455676402:web:a122711833fd9e35b4d56b"
  };


const firebaseDB = firebase.initializeApp(firebaseConfig);

const db = firebaseDB.database().ref();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { auth, googleAuthProvider, facebookAuthProvider, db };