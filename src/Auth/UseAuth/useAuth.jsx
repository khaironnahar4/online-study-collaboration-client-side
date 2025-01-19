import { useContext } from "react"
import AuthContext from "../AuthContext/AuthContext"


function useAuth() {
    const authProvider = useContext(AuthContext);
    return authProvider;
}

export default useAuth;