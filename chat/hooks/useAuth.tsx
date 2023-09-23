import { AuthContext } from "@/context/auth context/AuthContext";
import { useContext } from "react";


const useAuth = () => useContext(AuthContext);

export default useAuth;
