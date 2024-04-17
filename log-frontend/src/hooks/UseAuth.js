//Custom hook to access the Authentication state to be utilized in other components
import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.email ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;