require("dotenv").config();

const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://console.firebase.google.com/u/0/project/zapas-56035/firestore/data/~2Fusers~2F0NRNKILSPHhlb4YV3SSCKouDVN52'
});
const admin = require("firebase-admin");
const app = !admin.apps.length ? admin.initializeApp() : admin.app();
const db = getFirestore();

module.exports = { db };
