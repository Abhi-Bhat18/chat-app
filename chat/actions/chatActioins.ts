import axios from "axios";
import { BASE_URL } from "@/utils/config";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/all`);

    if (response.status === 200) return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

export const getAllConversations = async () => {
  try {
  } catch (error) {}
};

export const createOrGetConversation = async (userId: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/conversation`,
      {
        userId,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 201) return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error };
  }
};

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
