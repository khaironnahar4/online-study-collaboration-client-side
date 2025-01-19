import { useQuery } from "@tanstack/react-query";
import useAuth from "../Auth/UseAuth/useAuth";
import useAxiosSecure from "./useAxiosSecure";


function useBookedSession() {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data: bookedSessions = []} = useQuery({
        queryKey: ["bookedSession"],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/booked-sessions?std_email=${user?.email}`);
            console.log(res.data);
            
            return res.data;
        }
    })
  return [bookedSessions]
}

export default useBookedSession