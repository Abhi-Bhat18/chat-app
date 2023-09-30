import axiosInstance, { METHODS } from "@/utils/axiosInstance";
const getAxiosInstance = axiosInstance(METHODS.GET, null, true);
const postAxiosInstance = axiosInstance(METHODS.POST, null, true);

export const getAllUsers = async () => {
  try {
    const response = await getAxiosInstance.get("/user");
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error };
  }
};
