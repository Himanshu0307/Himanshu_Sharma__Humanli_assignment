import {api} from '../config/axiosConfig';


export async function login(data) {
    

   return await api.post("user/login",{email:data.email,password:data.password});
}