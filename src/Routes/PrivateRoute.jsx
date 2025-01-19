
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Auth/UseAuth/useAuth";



function PrivateRoute({children}) {
    const {user, loader} = useAuth();
    const location = useLocation();

    if(loader) return <p className="flex justify-center items-center text-2xl font-bold">Loading...</p>;

    if(user && user?.email) return children;


  return <Navigate to={'/login'} state={location?.pathname}></Navigate>
  
}

export default PrivateRoute