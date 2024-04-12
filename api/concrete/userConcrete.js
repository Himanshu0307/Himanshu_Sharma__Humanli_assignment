import db from "../config/firebase.js";
import { addDoc, collection, getDocs ,setDoc} from "firebase/firestore";


// const user = { fullName, email, password };

async function createUser(userModel) {
    // assert(typeof (user) == typeof (userModel))
    try {
        await setDoc(collection(db, "users",userModel.email), {
            fullName: "",
            email: "",
            password: ""
        },);

       return true;
    } catch (e) {
        return false;;
    }

}

async function getUserList() {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.map((doc) => {
       let {fullName,email}=  doc.data();
       return {fullName,email};
    });
}





async function verifyUser({email,password}){
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.map(x=>x.data()).some(y=>y.email===email && y.password===password);
}

module.exports={createUser,getUserList,verifyUser};