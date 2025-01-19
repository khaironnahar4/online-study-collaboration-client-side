import { Link } from "react-router-dom";
import useAuth from "../../../Auth/UseAuth/useAuth";
import SectionTitle from "../../../Components/SectionTitle";
import useBookedSession from "../../../Hooks/useBookedSession"


function StudentHome() {
    const {user} = useAuth()
    const [bookedSessions] = useBookedSession();
    // console.log(bookedSessions);
    
  return (
    <div>
        <div>
        <SectionTitle
          heading={`Welcome ${user.displayName}`}
          subHeading="Your Booked Courses"
        //   btnText="Explore Courses"
        ></SectionTitle>
      </div>

      {/* courses */}

      <div className="mt-[8vh] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {/* card */}
        {bookedSessions.map((course) => (
          <div key={course._id} className="card bg-base-100 shadow-xl">
            {/* <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure> */}
            <div className="card-body">
              <div className="badge bg-[#f37260] text-white py-4 px-5">
                Booked
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
    </div>
  )
}

export default StudentHome