var express = require('express')
var { getAllMessage } = require('../concrete/chatConcrete')

var chatRouter = express.Router();

chatRouter.get('/getMessage/:roomId', async (req, res) => {
    try {
        var roomId = req.params.roomId
        console.log(roomId)
        var messages = await getAllMessage(roomId);
        res.status(200).json({ data: messages })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = chatRouter