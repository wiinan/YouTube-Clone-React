import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCAct3D5M95Ss3SdcgZVxgs-WdNk_pOe3s",
    authDomain: "yt-con.firebaseapp.com",
    projectId: "yt-con",
    storageBucket: "yt-con.appspot.com",
    messagingSenderId: "71559634506",
    appId: "1:71559634506:web:38b6bf03c587563a7a90b3"
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()