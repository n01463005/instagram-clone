// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  import firebase from "firebase";
  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDiNn04tT7phGp6UQD4p0xMeH9dm4kb2g8",
    authDomain: "instagram-clone-2a219.firebaseapp.com",
    projectId: "instagram-clone-2a219",
    storageBucket: "instagram-clone-2a219.appspot.com",
    messagingSenderId: "995450026897",
    appId: "1:995450026897:web:f2b31e57c5d7e0b9e07830",
    measurementId: "G-4XWMJNNPDB"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export {db, auth, storage};