import api from '../config/axiosConfig'
// import auth from "../config/firebase";
import { io } from "socket.io-client";

const baseURL = "http://localhost:3001/api";



export const initiateSocketConnection = async () => {
    // const token = await getUserToken();

    const socket = io("http://localhost:3001", {
      
    });

    return socket;
};


export const getAllUsers = async () => {
    // const header = await createHeader();

    // try {
    //     const res = await api.get(`user`, header);
    //     return res.data;
    // } catch (e) {
    //     console.error(e);
    // }
};

export const getUser = async (userId) => {
    // const header = await createHeader();

    // try {
    //     const res = await axios.get(`${baseURL}/user/${userId}`, header);
    //     return res.data;
    // } catch (e) {
    //     console.error(e);
    // }
};

export const getUsers = async (users) => {
    // const header = await createHeader();

    // try {
    //     const res = await axios.get(`${baseURL}/user/users`, users, header);
    //     return res.data;
    // } catch (e) {
    //     console.error(e);
    // }
};

export const getChatRooms = async (userId) => {
    // const header = await createHeader();

    // try {
    //     const res = await axios.get(`${baseURL}/room/${userId}`, header);
    //     return res.data;
    // } catch (e) {
    //     console.error(e);
    // }
};

export const getChatRoomOfUsers = async (firstUserId, secondUserId) => {
    // const header = await createHeader();

    // try {
    //     const res = await axios.get(
    //         `${baseURL}/room/${firstUserId}/${secondUserId}`,
    //         header
    //     );
    //     return res.data;
    // } catch (e) {
    //     console.error(e);
    // }
};

export const createChatRoom = async (members) => {
    // const header = await createHeader();

    // try {
    //     const res = await axios.post(`${baseURL}/room`, members, header);
    //     return res.data;
    // } catch (e) {
    //     console.error(e);
    // }
};

export const getMessagesOfChatRoom = async (chatRoomId) => {
    // const header = await createHeader();

    // try {
    //     const res = await axios.get(`${baseURL}/message/${chatRoomId}`, header);
    //     return res.data;
    // } catch (e) {
    //     console.error(e);
    // }
};

export const sendMessage = async (messageBody) => {
    // const header = await createHeader();

    // try {
    //     const res = await axios.post(`${baseURL}/message`, messageBody, header);
    //     return res.data;
    // } catch (e) {
    //     console.error(e);
    // }
};
