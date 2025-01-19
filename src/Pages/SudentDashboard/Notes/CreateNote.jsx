import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle";
import useAuth from "../../../Auth/UseAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

function CreateNote() {
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
    const noteData = {
      email: user?.email,
      title: data.title,
      note: data.notes,
    };
    // console.log(noteData);
    axiosSecure.post("/notes", noteData).then((res) => {
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
  };

  return (
    <div>
      <SectionTitle
        heading={`Create Your Notes`}
        subHeading="Create Your Notes"
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

export default CreateNote;
