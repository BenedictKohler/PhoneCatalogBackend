// This page establishes a connection with cloud firestore

var admin = require("firebase-admin");

const serviceAccount = require('./phone-catalog-6a6d9-firebase-adminsdk-yhfbn-8577952fe5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;