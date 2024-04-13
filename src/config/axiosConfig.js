import axios from "axios"


export const api = axios.create({

  baseURL: "http://localhost:5001/",
  mode: 'cors'
})


// Add a response interceptor


