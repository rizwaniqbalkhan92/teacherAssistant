
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyCl4CrwYkwFW6IGivfkw7PEwpmRCzsGTnQ",
  authDomain: "dostai92.firebaseapp.com",
  projectId: "dostai92",
  storageBucket: "dostai92.appspot.com",
  messagingSenderId: "565796545681",
  appId: "1:565796545681:web:72626c917b28dca05bcb30",
  measurementId: "G-G1DL41JB2N",
  databaseURL: "https://dostai92-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

module.exports = { firebaseApp, database,auth };
