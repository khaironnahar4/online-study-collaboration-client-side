import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Auth/UseAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function AllMaterials() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: materials = [], refetch } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials?email=${user?.email}`);
      return res.data;
    },
  });

  //   delete material
  const handleDeleteMaterial = (id) => {
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
        axiosSecure.delete(`/meterials/${id}`).then((res) => {
            console.log(res.data);
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
        heading={`All Materials`}
        subHeading="Your All Materials"
        // btnText="All Notes"
      ></SectionTitle>
      <div className="mt-[8vh] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full">
        {materials.map((material) => (
          <div key={material._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={material.image}
                alt="image"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{material.materialTitle}</h2>
              <p>Resource Link: <Link to={material.link}>{material.link}</Link></p>
              <div className="card-actions justify-end mt-6">
                <Link
                  to={`/dashboard/update-materials/${material._id}`}
                  className="btn btn-success text-white text-xl"
                >
                  <FaEdit></FaEdit>
                </Link>
                <button
                  onClick={() => handleDeleteMaterial(material._id)}
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

export default AllMaterials;
