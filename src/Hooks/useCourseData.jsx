import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic"


const useCourseData = ()=>{
    const axiosPublic = UseAxiosPublic();
    const {data: courses = []} = useQuery({
        queryKey: ['course'],
        queryFn: async ()=>{
            const res = await axiosPublic.get("/study-sessions?limit=6")
            return res.data;
        }
    })

    return [courses]
}

export default useCourseData;