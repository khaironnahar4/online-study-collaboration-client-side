import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

function AllUsers() {
 const [search, setSearch] = useState('');
//  const [users, setUsers] = useState([])
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
        // console.log(search);
        
      const res = await axiosSecure.get(`/users?search=${search}`);
        // setUsers(res.data);
      return res.data;
    },
  });
  
  //   console.log(users);

  const handleUpdateRole = (id, newRole) => {
    // const selectedRole = e.target.value;
    console.log(id, newRole);
    Swal.fire({
      title: `Are you sure about changing the role to ${newRole}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Change role to ${newRole}`,
    }).then((result) => {
      if (result.isConfirmed) {
        // update user role
        const userData = {
          role: newRole,
        };
        axiosSecure.put(`/users?id=${id}`, userData).then((res) => {
          // if(res.data.updated)
          // console.log(res.data);
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Updated",
              text: "User role has been updated.",
              icon: "success",
            });

            refetch();
          }
        });
      }
    });
  };

// //   search functionality
// const handleSearch = e =>{
//     setSearch(e.target.value);
//     refetch();
// }
// console.log(search);


  return (
    <div className="mb-12">
      <div>
        <SectionTitle
          heading={`All Users (${users.length})`}
          subHeading="Manage Users Role"
          //   btnText="Explore Courses"
        ></SectionTitle>
      </div>

      {/* search option */}
      <div className="flex justify-end">
        <div className="form-control my-8">
          <input onChange={
            (e) => {
                setSearch(e.target.value);
                refetch();
            }
          }
            type="text"
            placeholder="Search"
            className="input input-bordered w-48"
          />
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.image} alt={`${user.name} image`} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role != "student" && (
                    <button
                      onClick={() => handleUpdateRole(user._id, "student")}
                      className="btn mt-2 border border-gray-300 bg-transparent btn-xs block"
                    >
                      Student
                    </button>
                  )}
                  {user.role != "tutor" && (
                    <button
                      onClick={() => handleUpdateRole(user._id, "tutor")}
                      className="btn mt-2 border border-gray-300 bg-transparent btn-xs block"
                    >
                      Tutor
                    </button>
                  )}

                  {user.role != "admin" && (
                    <button
                      onClick={() => handleUpdateRole(user._id, "admin")}
                      className="btn mt-2 border border-gray-300 bg-transparent btn-xs block"
                    >
                      Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUsers;
