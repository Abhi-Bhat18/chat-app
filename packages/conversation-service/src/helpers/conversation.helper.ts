import Message from "src/models/message.model";
import Conversation from "src/models/conversation.model";

// get the conversation's unread count and the last message
export const cacheLastMessageWithUnreadCount = async ( conversationId : string) =>  { 
    try {
        // check wether the conversation exists or not
        const conversation = await Conversation.findById(conversationId);

        if(!conversation) return null
        // get the messages from the conversation 

        
        
    } catch (error) {
        
    }

}