import useAxiosSecure from './useAxiosSecure';
import useAuth from '../Auth/UseAuth/useAuth';
import { useQuery } from '@tanstack/react-query';

function useAdmin() {
    const axiosSecure = useAxiosSecure();
  const {user} = useAuth()

  const {data: isAdmin = false}= useQuery({
    queryKey: ["admin"],
    enabled: !! user?.email,
    queryFn: async ()=>{
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data.admin;
    }
  })
  return [isAdmin]
}

export default useAdmin