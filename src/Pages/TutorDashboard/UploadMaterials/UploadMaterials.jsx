import { useForm } from "react-hook-form";
import useAuth from "../../../Auth/UseAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import { useLoaderData } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGWBB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


function UploadMaterials() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const studySessionData = useLoaderData();
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    const handleFormSubmit = async (data) => {
      // console.log(data);

      const imageFile = {image: data.image[0]};
    const res = await axiosSecure.post(image_hosting_api, imageFile, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    })

      const materialsData = {
        materialTitle: data.title,
        tutorEmail: user?.email,
        sessionID: studySessionData[0]._id,
        image: res.data.data.display_url,
        link: data.link
      };
      // console.log(materialsData);
        axiosSecure.post("/materials", materialsData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your study session materials has been uploaded",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          reset();
        });
  };
  return (
    <div className="mb-12">
    <SectionTitle
      heading={`Upload Materials`}
      subHeading={`Add materials for ${studySessionData[0].sessionTitle}`}
      //   btnText="Explore Courses"
    ></SectionTitle>

    <div className="lg:w-1/2 mx-auto">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col"
      >
        {/* name */}
        <input
          value={studySessionData[0]._id}
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

          {/* image */}
        <label className="form-control w-full my-4">
          <div className="label">
            <span className="label-text">Image</span>
          </div>
          <input
            {...register("image", { required: true })}
            type="file"
            placeholder="image"
            className="file-input file-input-bordered w-full"
          />
          {/* <input type="file" className="file-input file-input-bordered w-full max-w-xs" /> */}
          {errors.image && (
            <p role="alert" className="text-red-700">
              Please select an image
            </p>
          )}
        </label>

        {/* description */}
        <label className="form-control w-full my-4">
          <div className="label">
            <span className="label-text">Link</span>
          </div>
          <textarea
            {...register("link", { required: true })}
            className="textarea textarea-bordered"
            placeholder="provide link of resources material"
          ></textarea>
          {errors.link && (
            <p role="alert" className="text-red-700">
              Please provide link.
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
  )
}

export default UploadMaterials