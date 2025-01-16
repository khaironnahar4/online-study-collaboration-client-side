import axios from "axios"

const axiosPublic = axios.create({
    baseURL: "http://localhost:5000/"
})

function UseAxiosPublic() {
  return axiosPublic;
}

export default UseAxiosPublic