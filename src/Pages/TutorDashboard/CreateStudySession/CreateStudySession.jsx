import { useForm } from "react-hook-form";
import useAuth from "../../../Auth/UseAuth/useAuth";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

function CreateStudySession() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    // console.log(data);
    const studySession = {
      sessionTitle: data.title,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      averageRating: 5,
      sessionDescription: data.desciption ,
      registrationStartDate: data.registrationStart ,
      registrationEndDate: data.registrationEnd ,
      classStartTime: data.classStart ,
      classEndTime: data.classEnd ,
      sessionDuration: data.duration ,
      registrationFee: 0,
    };
    // console.log(studySession);
      axiosSecure.post("/study-sessions", studySession).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your notes uploaded",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        reset();
      });
    
    reset();
};
  return (
    <div className="mb-12">
      <SectionTitle
        heading={`Welcome ${user.displayName}`}
        subHeading="Create Study Session"
        //   btnText="Explore Courses"
      ></SectionTitle>

      <div className="lg:w-1/2 mx-auto">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col"
        >
          {/* name */}
          <input
            value={user?.displayName}
            type="text"
            className="input input-bordered w-full my-4"
            readOnly
          />
          {/* email */}
          <input
            value={user?.email}
            type="text"
            className="input input-bordered w-full my-4"
            readOnly
          />
          {/* title */}

          <label className="form-control w-full my-4">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p role="alert" className="text-red-700">
                Please give the title
              </p>
            )}
          </label>

          {/* description */}
          <label className="form-control w-full my-4">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              {...register("desciption", { required: true })}
              className="textarea textarea-bordered"
              placeholder="Notes"
            ></textarea>
            {errors.notes && (
              <p role="alert" className="text-red-700">
                Please write description about your session.
              </p>
            )}
          </label>

          {/* dates */}
          <div className="flex items-start gap-4 my-4">
            {/* dates */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Registration Start</span>
              </div>
              <input
                type="date"
                {...register("registrationStart", { required: true })}
                placeholder="1/19/2025"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.registrationStart && (
                <p role="alert" className="text-red-700">
                  Please give the date.
                </p>
              )}
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Registration end</span>
              </div>
              <input
                type="date"
                {...register("registrationEnd", { required: true })}
                placeholder="1/27/2025"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.registrationEnd && (
                <p role="alert" className="text-red-700">
                  Please give the date.
                </p>
              )}
            </label>
          </div>

          {/* time */}
          <div className="flex items-start gap-4 my-4">
            {/* time */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Clas Start Time</span>
              </div>
              <input
                type="text"
                {...register("classStart", { required: true })}
                placeholder="12:00"
                className="input input-bordered w-full"
              />
              {errors.ClassStart && (
                <p role="alert" className="text-red-700">
                  Please give the class start time.
                </p>
              )}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Class End Time</span>
              </div>
              <input
                type="text"
                {...register("classEnd", { required: true })}
                placeholder="14:00"
                className="input input-bordered w-full"
              />
              {errors.classEnd && (
                <p role="alert" className="text-red-700">
                  Please give the class end time.
                </p>
              )}
            </label>
          </div>

          {/* duration */}
          <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Session Duration (in hour)</span>
              </div>
              <input
                type="number"
                {...register("duration", { required: true })}
                placeholder="2"
                className="input input-bordered w-full"
              />
              {errors.duration && (
                <p role="alert" className="text-red-700">
                  Please give session total duration.
                </p>
              )}
            </label>

          <div className="mt-6 w-full">
            {/* <Button text="Done"></Button> */}
            <button className="w-full bg-[#afd275] py-3 text-center rounded-md hover:bg-[#2f4021] hover:text-[#afd275]">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStudySession;
