require("dotenv").config();

const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://console.firebase.google.com/project/zapasemergencia/firestore/data/~2Fuser~2FxG6ihEVhxrWyOOuoiEJ2'
});
const admin = require("firebase-admin");
const app = !admin.apps.length ? admin.initializeApp() : admin.app();
const db = getFirestore();

module.exports = { db };
