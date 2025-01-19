import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Auth/UseAuth/useAuth";
import { useEffect, useState } from "react";

function AllStudySession() {
  // const courses = [];
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: courses = [], refetch } = useQuery({
    queryKey: ["studySession", user.email],
    queryFn: async () => {
    //   console.log(status);
      const res = await axiosSecure.get(
        `/study-sessions?email=${user?.email}&&status=${status}`
      );
      return res.data;
    },
  });

//   useEffect(()=>{
    
//   }, [])

  //   axiosSecure.patch(`/study-sessions`, data).then((res) => {
  //     console.log(res.data);
  //   });

  const handleStatus = (data) => {
      console.log(data.target.value);
      const input = data.target.value;
      if(input === "All Study Session") setStatus(" ");
      if(input === "Approved") setStatus("approved");
      if(input === "Pending") setStatus("pending");
      if(input === "Rejected") setStatus("rejected");
    // setStatus(data);
    // console.log(status);

    refetch();
  };

  return (
    <div className="mb-12">
      <div>
        <SectionTitle
          heading="All Study Sessions"
          subHeading="Your All Study Sessions"
          //   btnText="Explore Courses"
        ></SectionTitle>
      </div>

      {/* dropdown */}
      {/* <details className="dropdown mb-6 mt-[8vh]">
        <summary className="btn m-1">All Study Session</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li>
            <a onClick={() => handleStatus("approved")}>Approved</a>
          </li>
          <li>
            <a onClick={() => handleStatus("pending")}>Pending</a>
          </li>
          <li>
            <a onClick={() => handleStatus("rejected")}>Rejected</a>
          </li>
        </ul>
      </details> */}

      <select onChange={handleStatus} 
      className="select select-bordered btn m-1 mb-6 mt-[8vh]">
        <option selected>
          All Study Session
        </option>
        <option>Approved</option>
        <option>Pending</option>
        <option>Rejected</option>
      </select>

      {/* courses */}

      <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {/* card */}
        {courses.map((course) => (
          <div key={course._id} className="card bg-base-100 shadow-xl">
            {/* <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure> */}
            <div className="card-body">
              <div className="badge bg-[#f37260] text-white py-4 px-5">
                {course.status}
              </div>
              <h2 className="text-[24px] font-bold text-[#2f4021] text-center mt-4">
                {course.sessionTitle}
              </h2>
              <p>{course.sessionDescription}</p>
              <div className="card-actions justify-center mt-4">
                {/* <div className="badge badge-outline">Fashion</div> */}
                <Link
                  to={`/study-session/${course._id}`}
                  className="py-2 px-5 rounded-md bg-[#afd275] text-white font-semibold
            cursor-pointer hover:bg-[#f37260]"
                >
                  View Course
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllStudySession;
