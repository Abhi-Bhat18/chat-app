import axios from "axios";

export const sendMessaege = async (
  message: string,
  receiverId: string,
  fileUrl: string,
  conversationId: string
) => {
  try {
    const response = await axios.get("");
  } catch (error) {
    
  }
}; 


export const createConversation = async ( userId : string) => {
    try {
        const response = await axios.get('');
        if(response.status === 200) {

        }
    } catch (error) {
        return Promise.resolve({'success' : false, error : error})
    }
}