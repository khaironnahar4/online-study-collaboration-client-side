import useAxiosSecure from './useAxiosSecure';
import useAuth from '../Auth/UseAuth/useAuth';
import { useQuery } from '@tanstack/react-query';

function useTutor() {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
  

    const {data: isTutor = false}= useQuery({
        queryKey: ["tutor"],
        queryFn: async ()=>{
          const res = await axiosSecure.get(`/users/tutor/${user?.email}`);
          return res.data.tutor;
        }
      })
  return [isTutor]
}

export default useTutor