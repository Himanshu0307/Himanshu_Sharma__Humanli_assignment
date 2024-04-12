const auth = require('../config/firebase')
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");



async function createUser({ email, password }) {
  try{

    return await createUserWithEmailAndPassword(auth, email, password);
  }
  catch(error) {
    return null;
  }

}

async function loginUser({ email, password }) {
  try{
    return signInWithEmailAndPassword(auth, email, password);

  }
  catch(e){
    return null;
  }
  
}

async function logout() {
  return await signOut(auth);
}



module.exports = { createUser, createUser, loginUser, logout };