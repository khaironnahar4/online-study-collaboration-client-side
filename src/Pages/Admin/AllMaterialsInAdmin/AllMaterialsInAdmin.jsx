import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function AllMaterialsInAdmin() {
  const axiosSecure = useAxiosSecure();

  // fetch all the study session data
  const { data: materials = [], refetch } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const res = await axiosSecure.get("/materials");
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
    <div className="mb-12">
      <div>
        <SectionTitle
          heading={`All Study Sessions (${materials.length})`}
          subHeading="All Pending And Approved Study Sessions"
          //   btnText="Explore Courses"
        ></SectionTitle>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>title</th>
              <th>Tutor Email</th>
              <th>Image</th>
              <th>Link</th>
              <th className="text-center">Activity</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {materials.map((material) => (
              <tr key={material._id}>
                <td>
                  <div className="font-bold">{material.materialTitle}</div>
                </td>
                <td>{material.tutorEmail}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={material.image} alt="material image" />
                    </div>
                  </div>
                </td>
                <td>{material.link}</td>
                <td
                  className={`${
                    material.status == "approved"
                      ? "text-green-600 font-semibold"
                      : "text-yellow-500"
                  }`}
                >
                  {material.status}
                </td>
                <td className="flex items-center justify-center">
                  <div>
                    <Link
                      to={`/dashboard/update-materials/${material._id}`}
                      className="btn btn-sm bg-[#afd375]  hover:bg-green-600 me-2"
                    >
                      <FaEdit></FaEdit>
                    </Link>
                    <button
                      onClick={() => handleDeleteMaterial(material._id)}
                      className="btn btn-sm bg-[#f37260] hover:bg-red-600"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllMaterialsInAdmin;
