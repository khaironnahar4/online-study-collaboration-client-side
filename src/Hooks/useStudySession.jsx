import { useQuery } from "@tanstack/react-query";
import useAuth from "../Auth/UseAuth/useAuth";
import useAxiosSecure from "./useAxiosSecure";


function useStudySession() {
    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: courses = [], refetch } = useQuery({
    queryKey: ["studySession", user.email],
    queryFn: async () => {
      console.log(status);
      const res = await axiosSecure.get(
        `/study-sessions?email=${user?.email}&&status=${status}`
      );
      return res.data;
    },
  });
  return (
    <div>useStudySession</div>
  )
}

export default useStudySession