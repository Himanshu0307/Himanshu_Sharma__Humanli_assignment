import { api } from '../config/axiosConfig';


export async function login(data) {


   return await api.post("user/login", { email: data.email, password: data.password });
}
export async function register(data) {


   return await api.post("user/register", { email: data.email, password: data.password });
}


export async function getAllUser(){
   return await api.get("user/getUserList")
}