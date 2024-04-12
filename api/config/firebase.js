const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

module.exports= auth;



