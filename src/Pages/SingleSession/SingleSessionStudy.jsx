import { Link, useLoaderData } from "react-router-dom";
import Button from "../../Components/Button";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import useAuth from "../../Auth/UseAuth/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Rating from "react-rating-stars-component";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../Hooks/useAdmin";
import useTutor from "../../Hooks/useTutor";

function SingleSessionStudy() {
  const [disabled, setDisabled] = useState(false);
  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();
  const [rating, setRating] = useState(5);
  //   const [reviewData, setReviewData] = useState([]);
  const { user } = useAuth();
  const axiosPublic = UseAxiosPublic();
  const studySessionData = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    _id,
    sessionTitle,
    tutorName,
    tutorEmail,
    averageRating,
    sessionDescription,
    registrationEndDate,
    classStartTime,
    classEndTime,
    sessionDuration,
    registrationFee,
  } = studySessionData[0];

    // console.log(typeof(registrationFee));

  const handleBookedSession = () => {
    const bookedSessionData = {
      study_session_id: _id,
      student_email: user?.email,
      tutor_email: tutorEmail,
    };
    // console.log(bookedSessionData);
    axiosPublic.post("/booked-sessions", bookedSessionData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Session has been booked!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          // position: "top-end",
          icon: "warning",
          title: res.data.message,
          showConfirmButton: true,
          // timer: 1500
        });
      }
    });
  };

  //   review data
  const { data: reviewData = [], refetch } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?id=${_id}`);
      return res.data;
    },
  });

  //   review form
  const handleFormSubmit = (data) => {
    const reviewData = {
      study_session_id: _id,
      review: data.review,
      rating: rating,
      user_name: user?.displayName,
      user_img: user?.photoURL,
    };
    console.log(reviewData);
    axiosSecure.post("/reviews", reviewData).then((res) => {
      if (res.data.insertedId) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your review uploaded",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      reset();
    });
  };

  //   console.log(reviewData);

  useEffect(()=>{
    if(isAdmin) setDisabled(true);
    if(isTutor) setDisabled(true);
  } ,[isAdmin, isTutor])

  return (
    <div>
      {/* study card */}
      <div className="card mx-auto lg:w-1/2 w-full p-6 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-[#2f4021] lg:text-[40px] text-3xl font-bold">
            {sessionTitle}
          </h2>
          <p>By {tutorName}</p>
          <p className="py-4">{sessionDescription}</p>
          <div className="font-semibold">
            <p>Rating : {averageRating}</p>
            <p>Duration : {sessionDuration}</p>
            <p>
              Class Time : {classStartTime} - {classEndTime}
            </p>
            <p>Registration End : {registrationEndDate}</p>
            <p>Registration Fee : ${registrationFee}</p>
          </div>
          <div className="card-actions justify-center">
            {/* {
              registrationFee == 0 && console.log("registration fee 0")
            }{ 
              registrationFee > 0 && console.log("registration fee more than 0")
              
            } */}
            {
              registrationFee == 0 ?
            <span>
              <button onClick={handleBookedSession} 
              disabled={disabled}
              className={`py-3 px-6 bg-[#AFD275] text-[#2f4021] cursor-pointer
               font-semibold rounded-md hover:text-[#AFD275] hover:bg-[#2f4021]
                disabled:bg-white disabled:text-gray-400 disabled:border disabled:cursor-not-allowed`}
              >Enroll Now</button>
            </span>
            :
            <span>
              <Link to={`/payment/${_id}`}
              disabled={disabled}
              className={`py-3 px-6 bg-[#AFD275] text-[#2f4021] cursor-pointer
               font-semibold rounded-md hover:text-[#AFD275] hover:bg-[#2f4021]
                disabled:bg-white disabled:text-gray-400 disabled:border disabled:cursor-not-allowed`}
              >Enroll Now</Link>
            </span>

            }
          </div>
        </div>
      </div>

      {/* review form */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mt-14 max-w-xl"
      >
        <h1 className="text-3xl font-bold text-[#afd275] py-6">Reviews</h1>
        {/* rating */}
        <div className="form-control">
          <h2>Rate this session:</h2>
          <Rating
            count={5}
            value={rating}
            onChange={(value) => setRating(value)}
            size={30}
            activeColor="#ffd700"
          />
          {/* <p>Your rating: {rating}</p> */}
        </div>
        <div className="form-control">
          <textarea
            {...register("review", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Write Your Review"
          ></textarea>
          {errors.review && (
            <p role="alert" className="text-red-700">
              Please put your review.
            </p>
          )}
        </div>

        <div className="mt-4">
          <Button text="Submit"></Button>
        </div>
      </form>

      {/* reviews */}

      <div className="mt-[8vh]">
        <h1 className="text-[#2f4021] text-2xl font-semibold py-6">
          All Reviews ({reviewData.length})
        </h1>
        {reviewData.map((review) => (
          <div
            key={review._id}
            className="flex items-center gap-6 mt-6 p-4 shadow-sm"
          >
            <div>
              <img
                className="w-24 h-24 rounded-full"
                src={review.user_img}
                alt={`${review.user_name} image`}
              />
            </div>
            <div>
              <p className="text-xl font-semibold">{review.user_name}</p>
              <Rating
                count={5}
                value={review.rating}
                size={30}
                activeColor="#ffd700"
              />
              {/* <p>{review.rating}</p> */}
              <p>{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleSessionStudy;
