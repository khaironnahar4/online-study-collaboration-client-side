import axios from "axios"

const axiosPublic = axios.create({
    baseURL: "https://online-tech-server-side.vercel.app/"
})

function UseAxiosPublic() {
  return axiosPublic;
}

export default UseAxiosPublic