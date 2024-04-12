const { type } = require('@testing-library/user-event/dist/type');
var jsonWeb=require('json-webtoken');
function  getToken(res) {
    var token = res.headers['x-auth-token'];
    // check if token exists
    if (!token) return null;
   try{
       // verify token and store the decoded value in req.decodedToken
       var decoded = jsonWeb.verify(token, process.env.JWT_SECRET);
       console.log("Decoded Token: ", decoded);
       return decoded;
   }catch(err){
       //return null if invalid or expired token
       return null;
   }
}
