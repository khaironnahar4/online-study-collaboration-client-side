import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
// import useTutors from "../../../Hooks/useTutors";

function TutorSection() {
  // const [tutors] = useTutors();
  const [tutors, setTutors] = useState([]);
  const axiosPublic = UseAxiosPublic()

  useEffect(()=>{
      axiosPublic.get('/users?role=tutor')
      .then(res => {
        setTutors(res.data)
      })
  }, [axiosPublic])


  console.log(tutors);

  return (
    <div>
      <div>
        <SectionTitle
          heading="Our Experience Tutors"
          subHeading="Our Tutors"
        ></SectionTitle>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-[8vh]">
        {tutors.map((tutor) => (
          <div key={tutor._id} className="card card-side bg-base-100 shadow-xl items-center">
            <div className="w-1/2 overflow-hidden p-2">
              <img
              className="w-full h-24 object-cover rounded-lg object-center"
                src={tutor.image}
                alt={`${tutor.name} image`}
              />
            </div>
            <div className="card-body">
              <h2 className="card-title text-[#2f4021]">{tutor.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TutorSection;
