import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDPUrw2ua9lg2zR2ZcSPS_jYPRSnfELcLI",
  authDomain: "manducare-50edf.firebaseapp.com",
  databaseURL: "https://manducare-50edf.firebaseio.com",
  projectId: "manducare-50edf",
  storageBucket: "manducare-50edf.appspot.com",
  messagingSenderId: "554657368264",
  appId: "1:554657368264:web:ecc8a040ed6a05ebaffdfd",
  measurementId: "G-BCSQQMCMTJ",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
export { db, auth, storage };
