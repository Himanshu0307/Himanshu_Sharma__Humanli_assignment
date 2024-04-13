import api from '../config/axiosConfig'
// import auth from "../config/firebase";
import { io } from "socket.io-client";

export const initiateSocketConnection = async () => {
    const socket = io("http://localhost:5001", {
        withCredentials: true
    });
    return socket;
};

