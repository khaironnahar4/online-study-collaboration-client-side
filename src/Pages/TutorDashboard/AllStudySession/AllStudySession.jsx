import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Auth/UseAuth/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

function AllStudySession() {
  // const courses = [];
  const [status, setStatus] = useState("");
  const [courses, setCourses] = useState([]);
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/study-sessions?email=${user?.email}&&status=${status}`)
      .then((res) => {
        setCourses(res.data);
      });
  }, [axiosSecure, user?.email, status]);

  // const {data: courses=[]} = useQuery({
  //   queryKey: ['sessions'],
  //   enabled: !loader,
  //   queryFn: async ()=>{
  //     const res = axiosSecure.get(`/study-sessions?email=${user?.email}&&status=${status}`);
  //     return res.data;
  //   }
  // })
  // console.log(courses);
  
  const handleStatus = (data) => {
    console.log(data.target.value);
    const input = data.target.value;
    if (input === "All Study Session") setStatus("");
    if (input === "Approved") setStatus("approved");
    if (input === "Pending") setStatus("pending");
    if (input === "Rejected") setStatus("rejected");
  };

  const handleRejectedSession = (id) => {
    const updatedStatus = { status: "pending", registrationFee: 0 };
    axiosSecure
      .put(`study-session/update-status?id=${id}`, updatedStatus)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Request has been send to approved this study session",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
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

      <select
        onChange={handleStatus}
        className="select select-bordered btn m-1 mb-6 mt-[8vh]"
      >
        <option selected>All Study Session</option>
        <option>Approved</option>
        <option>Pending</option>
        <option>Rejected</option>
      </select>

      {/* courses */}

      <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {/* card */}
        {courses.map((course) => (
          <div key={course._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="badge bg-[#f37260] text-white py-4 px-5">
                {course.status}
              </div>
              <h2 className="text-[24px] font-bold text-[#2f4021] text-center mt-4">
                {course.sessionTitle}
              </h2>
              <p>{course.sessionDescription}</p>
              <div className="card-actions flex-col items-center justify-center mt-4">
                {/* <div className="badge badge-outline">Fashion</div> */}
                <Link
                  to={`/study-session/${course._id}`}
                  className="py-2 px-5 rounded-md border-2 font-semibold
                             cursor-pointer hover:bg-[#f37260]"
                >
                  View Course
                </Link>

                {/* button for rejected session approved  */}
                {course.status == "rejected" && (
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip="Send a new request to accept the session"
                  >
                    <button
                      onClick={() => handleRejectedSession(course._id)}
                      className="py-2 px-5 rounded-md bg-[#afd275] text-white font-semibold
                  cursor-pointer hover:bg-green-500"
                    >
                      Send Request
                    </button>
                  </div>
                )}

                {course.status == "approved" && (
                  <Link
                    to={`/dashboard/upload-materials/${course._id}`}
                    className="py-2 px-5 rounded-md bg-[#afd275] text-white font-semibold
                             cursor-pointer hover:bg-green-500"
                  >
                    Upload Materials
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllStudySession;
