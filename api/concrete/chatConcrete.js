const { firestore } = require('../config/firebase-admin')


function getRommIdFromEmail(u1,u2){
    const sortedIds = [u1, u2].sort();
    return `${sortedIds[0]}-${sortedIds[1]}`;

}


 async function getAllMessage(roomId) {
    const roomChat = await firestore.collection('chat').doc(roomId).listCollections();
    const list = [];

    for (const collectionRef of roomChat) {
        const documents = await collectionRef.listDocuments();
        for (const docRef of documents) {
            const docData = (await docRef.get()).data();
            console.log(docData);
            list.push(docData);
        }
    }

    return list;
}

  async function createMessage(roomId, messageObject) {
    try{

        const collectionName = Date.now().toString(); // Create a unique collection name
        const roomRef = firestore.collection('chat').doc(roomId).collection(collectionName);

        await roomRef.add({
            message: messageObject.message,
            createdAt: messageObject.createdAt,
            sender: messageObject.sender,
            receiver: messageObject.receiver
        });

        console.log("Message created successfully!");
        return true;
    }
    catch (error) {
        console.error("Error creating message:", error);
        return false;
    }

}

module.exports={createMessage,getAllMessage}