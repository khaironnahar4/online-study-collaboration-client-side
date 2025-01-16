import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic"

function useTutors() {
    const axiosPublic = UseAxiosPublic();
    const {data: tutors = []} = useQuery({
        queryKey: ['tutor'],
        queryFn: async () =>{
            const res = await axiosPublic.get('/users?role=tutor')
            return res.data
        }
    })

  return [tutors]
}

export default useTutors