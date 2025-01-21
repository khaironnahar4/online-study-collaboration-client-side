import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../Auth/UseAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";

const image_hosting_key = import.meta.env.VITE_IMAGWBB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


function UpdateMaterials() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const materialData = useLoaderData();
    const navigate = useNavigate()
    // console.log(materialData);
    
  
    const {
      register,
      handleSubmit,
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
        image: res.data.data.display_url,
        link: data.link
      };
      // console.log(materialsData);
        axiosSecure.put(`/meterials/${materialData._id}`, materialsData).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your study session materials has been updated",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          navigate('/dashboard/tutor-all-metarials')
        });
  };

  return (
    <div className="mb-12">
    <SectionTitle
      heading={`Update Materials`}
      subHeading={`update materials for ${materialData.materialTitle}`}
      //   btnText="Explore Courses"
    ></SectionTitle>

    <div className="lg:w-1/2 mx-auto">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col"
      >
        {/* name */}
        <input
          value={materialData.sessionID}
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
            defaultValue={materialData.materialTitle}
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
            // defaultValue={materialData.image}
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
            // defaultValue={materialData.link}
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

export default UpdateMaterials