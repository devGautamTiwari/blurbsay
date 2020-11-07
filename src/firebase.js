import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAMY2JtBqFngQAu3rdCEeoYh5WCIu7xT9c",
  authDomain: "blurbsay.firebaseapp.com",
  databaseURL: "https://blurbsay.firebaseio.com",
  projectId: "blurbsay",
  storageBucket: "blurbsay.appspot.com",
  messagingSenderId: "406380711850",
  appId: "1:406380711850:web:7b2694b95acdcad74165d3",
});

export const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export default db;
