const auth = require('../config/firebase')
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} = require("firebase/auth");

const {adminAuth} = require('../config/firebase-admin')



async function createUser({ email, password }) {
  try {

    return await createUserWithEmailAndPassword(auth, email, password);
  }
  catch (error) {
    console.log(error)
    return null;
  }

}

async function loginUser({ email, password }) {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  }
  catch (e) {
    return null;
  }

}

async function logout() {
  return await signOut(auth);
}

async function getUserList() {
  try {
    var users = await adminAuth.listUsers();
    return users.users.map(x => {
      return { 'displayName': x.displayName, 'email': x.email }
    })
  }
  catch (e) {
    console.log(e)
    return null
  }
}


module.exports = { createUser, createUser, loginUser, logout, getUserList };