import { FaCalendarAlt, FaHome, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaList, FaWallet } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";

function Dashboard() {
  const isAdmin = true;
  const isTutor = false;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-start">
          <label
            htmlFor="my-drawer-2"
            className=" p-2 rounded-md mt-6 ms-4 self-start bg-transparent border border-black drawer-button lg:hidden"
          >
            <IoMdMenu />
          </label>
          {/* Page content here */}
          <div className="lg:ms-12 mt-12 w-full">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-[#AFD275] text-black font-2 uppercase font-semibold min-h-full w-[280px] p-4">
            {/* Sidebar content here */}

            <div className="mt-12 mb-10 text-center">
              <Link to={"/"} className="text-2xl font-bold">
                <span className="font-bold text-4xl text-[#2f4021]">E</span>
                Learn
              </Link>

              <p className="font-2 text-xl font-semibold uppercase">
                Online Learning Platform
              </p>
            </div>

            {isAdmin ? (
              // for admin
              <>
                {/* <li className="my-3">
                  <NavLink
                    to={"/dashboard/admin-home"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaHome /> Admin Home
                  </NavLink>
                </li> */}

                <li className="my-3">
                  <NavLink
                    to={"/dashboard/all-users"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaCalendarAlt /> All User
                  </NavLink>
                </li>

                <li className="my-3">
                  <NavLink
                    to={"/dashboard/all-study-session-admin"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaList /> All Study Sessions
                  </NavLink>
                </li>

                <li className="my-3">
                  <NavLink
                    to={"/dashboard/all-metarials"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaShoppingCart /> All Metarials
                  </NavLink>
                </li>
              </>
            ) : 
            isTutor ? (
              // for tutor
              <>
                {/* <li className="my-3">
                    <NavLink
                      to={"/dashboard/admin-home"}
                      className={`${({ isActive }) =>
                        isActive ? "active" : ""}`}
                    >
                      <FaHome /> Admin Home
                    </NavLink>
                  </li> */}

                <li className="my-3">
                  <NavLink
                    to={"/dashboard/create-study-session"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaCalendarAlt /> Create Study Session
                  </NavLink>
                </li>

                <li className="my-3">
                  <NavLink
                    to={"/dashboard/all-study-session"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaList /> All Study Sessions
                  </NavLink>
                </li>

                <li className="my-3">
                  <NavLink
                    to={"/dashboard/upload-metarials"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaShoppingCart /> Upload Metarials
                  </NavLink>
                </li>

                <li className="my-3">
                  <NavLink
                    to={"/dashboard/tutor-all-metarials"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaShoppingCart /> All Metarials
                  </NavLink>
                </li>
              </>
            ) : (
              // for logged in users
              <>
                <li className="my-3">
                  <NavLink
                    to={"/dashboard/student"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaHome /> Student Home
                  </NavLink>
                </li>

                <li className="my-3">
                  <NavLink
                    to={"/dashboard/create-note"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaCalendarAlt /> Create Note
                  </NavLink>
                </li>

                <li className="my-3">
                  <NavLink
                    to={"/dashboard/manage-note"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaWallet /> Manage Note
                  </NavLink>
                </li>

                <li className="my-3">
                  <NavLink
                    to={"/dashboard/metarials"}
                    className={`${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    <FaShoppingCart /> Materials
                  </NavLink>
                </li>
              </>
            )}

            {/* home */}
            <div className="divider"></div>
            <li className="my-2">
              <NavLink to={"/"}>
                <FaHome /> Home
              </NavLink>
            </li>

            {/* <li className="my-2">
              <NavLink to={"/our-shop"}>
                <FaShoppingBag /> All Courses
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
