const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const {getFirestore}=require("firebase-admin/firestore")

const serviceAccountKey = require("./serviceKey.json")

const app = initializeApp({
  credential: cert(serviceAccountKey),
});

const adminAuth = getAuth(app);

const firestore=getFirestore(app)

module.exports = {adminAuth,firestore};
