import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle";
import useAuth from "../../../Auth/UseAuth/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function ManageNote() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: notes = [], refetch } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notes?email=${user?.email}`);
      return res.data;
    },
  });

  //   delete note
  const handleDeleteNote = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/notes/${id}`).then((res) => {
          //   console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading={`All Notes`}
        subHeading="Your All Notes"
        // btnText="All Notes"
      ></SectionTitle>
      <div className="mt-[8vh] w-full mt-6">
        {notes.map((note) => (
          <div key={note._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{note.title}</h2>
              <p>{note.note}</p>
              <div className="card-actions justify-end mt-6">
                <Link to={`/dashboard/update-note/${note._id}`} 
                className="btn btn-success text-white text-xl">
                  <FaEdit></FaEdit>
                </Link>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="btn btn-error text-white text-xl"
                >
                  <FaTrash></FaTrash>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageNote;
