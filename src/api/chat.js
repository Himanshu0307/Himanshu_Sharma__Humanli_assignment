const { api } = require("../config/axiosConfig");

export async function getAllMessagesFromRoomId(roomId) {
    return await api.get(`chat/getMessage/${roomId}`)
}
