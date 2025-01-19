import { useForm } from "react-hook-form";
import useAuth from "../../../Auth/UseAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateNote() {
  const { user } = useAuth();
  const noteData = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  //   console.log(noteData[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    console.log(data);
    const note = {
        title: data.title,
        note: data.notes
    }
    axiosSecure.put(`/notes/${noteData[0]._id}`, note).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your notes uploaded",
          showConfirmButton: true,
          //   timer: 1500,
        });
        navigate("/dashboard/manage-note");
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading={`Update Your Notes`}
        subHeading="Update Your Notes"
        // btnText="All Notes"
      ></SectionTitle>
      <div className="lg:w-1/2 mx-auto">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col"
        >
          <input
            value={user?.email}
            type="text"
            className="input input-bordered w-full"
            readOnly
          />
          {/* title */}
          <input
            defaultValue={noteData[0].title}
            {...register("title", { required: true })}
            type="text"
            placeholder="Title"
            className="input input-bordered w-full my-4"
          />
          {errors.title && (
            <p role="alert" className="text-red-700">
              Please give the title
            </p>
          )}

          {/* notes */}
          <textarea
            defaultValue={noteData[0].note}
            {...register("notes", { required: true })}
            className="textarea textarea-bordered"
            placeholder="Notes"
          ></textarea>
          {errors.notes && (
            <p role="alert" className="text-red-700">
              Please write your note.
            </p>
          )}

          <div className="mt-6 w-full">
            {/* <Button text="Done"></Button> */}
            <button className="w-full bg-[#afd275] py-3 text-center rounded-md hover:bg-[#2f4021] hover:text-[#afd275]">
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateNote;
