import { Link } from "react-router-dom";
import Button from "../../../Components/Button";
import SectionTitle from "../../../Components/SectionTitle";
import { useEffect, useState } from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";

function PopularCourses() {

  const [courses, setCourses] = useState([]);
  const axiosPublic = UseAxiosPublic()

  useEffect(()=>{
      axiosPublic.get('/study-session/approved?limit=6')
      .then(res => {
          setCourses(res.data)
      })
  }, [axiosPublic])
  return (
    <div>
      <div>
        <SectionTitle
          heading="Our Popular Courses"
          subHeading="Our Popular Courses"
          btnText="Explore Courses"
        ></SectionTitle>
      </div>

      {/* courses */}

      <div className="mt-[8vh] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {/* card */}
        {courses.map((course) => (
          <div key={course._id} className="card bg-base-100 w-96 shadow-xl">
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
                <Link to={`/study-session/${course._id}`}
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

      <div className="mt-[8vh] w-full flex justify-center ">
        <Link to={'/all-courses'}>
        <Button text="All Courses"></Button>
        </Link>
      </div>
    </div>
  );
}

export default PopularCourses;
