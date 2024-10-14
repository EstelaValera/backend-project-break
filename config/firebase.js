const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyDYoIZ4THhZA_nsgHxquAlZhDUTNMqKNmo",
    authDomain: "tienda-de-ropa2110.firebaseapp.com",
    projectId: "tienda-de-ropa2110",
    storageBucket: "tienda-de-ropa2110.appspot.com",
    messagingSenderId: "216256660181",
    appId: "1:216256660181:web:f9fe3a1883b0b4bf1ed85c",
    measurementId: "G-XY4K0KZTXP"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

module.exports = { db };