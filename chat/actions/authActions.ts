import axios from "axios";
import { BASE_URL } from "@/utils/config";

export const logout = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/logout`);
    if (res.statusText === "OK") {
      return Promise.resolve({ success: true, data: res.data });
    }
  } catch (error) {
    return Promise.resolve({ success: false, error: error});
  }
};
