import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function AllStudySessionAdmin() {
  const axiosSecure = useAxiosSecure();

  // fetch all the study session data
  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-study-session");
      return res.data;
    },
  });

  // reject session
  const handleRejectSession = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you want to reject the session?",
      text: "You won't be able to see this session!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateStatus = { status: "rejected",  registrationFee: 0 };
        axiosSecure
          .put(`/study-session/update-status?id=${id}`, updateStatus)
          .then((res) => {
            refetch();
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Session is rejected",
                showConfirmButton: true,
                //   timer: 1500,
              });
            }
          });
      }
    });
  };

  // approved the session
  const handleApprovedSession = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Want to approved the session?",
      text: "Please give the study session registration fee.",
      icon: "question",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approved it!",
      denyButtonText: `Make it free.`
    }).then(async (result) => {
      if (result.isConfirmed) {

        const { value: fee } = await Swal.fire({
          title: "Registration fee",
          input: "text",
          inputLabel: "Please give study registration Fee",
          inputPlaceholder: "Enter the session registration fee.",
          showCancelButton: true,
        });
        if (fee) {
          console.log(fee);
          
          const updateStatus = { status: "approved", registrationFee: fee };
          axiosSecure
            .put(`/study-session/update-status?id=${id}`, updateStatus)
            .then((res) => {
              
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Session is approved and registration fee is ${fee}`,
                  showConfirmButton: true,
                  //   timer: 1500,
                });
              }
              refetch();
            });
        }

      }else if(result.isDenied){
        const updatedStatus = {status: "approved", registrationFee: 0}
        axiosSecure
          .put(`/study-session/update-status?id=${id}`, updatedStatus)
          .then((res) => {
            // console.log(res.data);
            
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Session is approved and made it free.",
                showConfirmButton: true,
                //   timer: 1500,
              });
            }
            refetch();
          });
      }
    });
  };


  // delete a session
  const handleDeleteSession = (id) => {
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
        axiosSecure.delete(`/study-sessions?id=${id}`).then((res) => {
          //   console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Session has been deleted.",
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
          heading={`All Study Sessions (${sessions.length})`}
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
              <th>tutorName</th>
              <th>Duration</th>
              <th>Registration fee</th>
              <th>status</th>
              <th className="text-center">Activity</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {sessions.map((session) => (
              <tr key={session._id}>
                <td>
                  <div className="font-bold">{session.sessionTitle}</div>
                </td>
                <td>{session.tutorName}</td>
                <td>{session.sessionDuration}</td>
                <td>{session.registrationFee}</td>
                <td className={`${session.status == "approved" ? 
                "text-green-600 font-semibold" :
                "text-yellow-500"}`}>{session.status}</td>
                <td className="flex items-center justify-center">
                  {
                    session.status == "approved" ? 
                    <div>
                      <Link to={`/dashboard/update-study-session/${session._id}`} 
                      className="btn btn-sm bg-[#afd375]  hover:bg-green-600 me-2">
                        <FaEdit></FaEdit>
                      </Link>
                      <button
                        onClick={() => handleDeleteSession(session._id)}
                        className="btn btn-sm bg-[#f37260] hover:bg-red-600"
                      >
                        <FaTrash></FaTrash>
                      </button>
                    </div>
                    :
                    <div className="flex flex-col gap-2">
                    <button onClick={()=> handleApprovedSession(session._id)} 
                    className="btn btn-xs bg-[#afd375]  hover:bg-green-600">
                      Approved
                    </button>
                    <button
                      onClick={() => handleRejectSession(session._id)}
                      className="btn btn-xs bg-[#f37260] hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                  }
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllStudySessionAdmin;
