import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Auth/UseAuth/useAuth";
import useAdmin from "../Hooks/useAdmin";


function AdminPivateRoute({children}) {
    const [isAdmin] = useAdmin()
    const {user, loader} = useAuth();
    const location = useLocation();

    if(loader) return <p className="flex justify-center items-center text-2xl font-bold">Loading...</p>;

    if(user && user?.email && isAdmin) return children;


  return <Navigate to={'/login'} state={location?.pathname}></Navigate>
}

export default AdminPivateRoute