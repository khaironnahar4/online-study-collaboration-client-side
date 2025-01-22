import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Auth/UseAuth/useAuth";
import useTutor from "../Hooks/useTutor";

function TutorPrivateRoute({children}) {
    const [isTutor] = useTutor();
    const {user, loader} = useAuth();
    const location = useLocation();

    if(loader) return <p className="flex justify-center items-center text-2xl font-bold">Loading...</p>;

    if(user && user?.email && isTutor) return children;


  return <Navigate to={'/login'} state={location?.pathname}></Navigate>
}

export default TutorPrivateRoute