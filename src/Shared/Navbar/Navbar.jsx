import { Link } from "react-router-dom";
import useAuth from "../../Auth/UseAuth/useAuth";
// import Button from "../../Components/Button";
import useAdmin from "../../Hooks/useAdmin";
import useTutor from "../../Hooks/useTutor";
import { useState } from "react";

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const { user, handleSignOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();

  return (
    <div className="navbar max-w-7xl mx-auto">
      <div className="flex-1">
        <Link to={"/"} className="text-2xl font-bold">
          <span className="font-bold text-4xl text-[#AFD275]">E</span>Learn
        </Link>
      </div>
      <div className="flex-none">
       <div className="hidden sm:flex items-center">
       <Link
          to={"/all-courses"}
          className="me-4 font-semibold border-b-2 border-transparent 
        hover:border-b-2 hover:text-[#afd275]"
        >
          All Courses
        </Link>
        {user && user?.email ? (
          <>
            <Link
              to={`/dashboard/${
                isAdmin
                  ? "all-users"
                  : isTutor
                  ? "all-study-session"
                  : "student"
              }`}
            >
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt={`${user?.name} photo`} src={user?.photoURL} />
                </div>
              </div>
            </Link>

            <button
              onClick={() => handleSignOut()}
              className="ms-2 py-3 px-6 bg-[#AFD275] text-[#2f4021] rounded-md hover:text-[#AFD275] hover:bg-[#2f4021]"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            {/* login and sign up btn */}
            <div className="font-semibold flex flex-col sm:flex-row">
              <Link
                to="/login"
                className="py-3 px-6 border border-black rounded-md hover:text-[#AFD275] hover:border-[#afd275]"
              >
                Login
              </Link>
              <Link
                to={"/sign-up"}
                className="ms-3 py-3 px-6 bg-[#AFD275] text-[#2f4021] rounded-md hover:text-[#AFD275] hover:bg-[#2f4021]"
              >
                Get Started
              </Link>
            </div>
          </>
        )}
       </div>

        {/* mobile menu */}
        <div className="flex flex-col sm:hidden">
          {/* hamburger icon */}
          <div
            tabIndex={0}
            role="button"
            className="menu-toggle cursor-pointer hover:bg-white rounded-full"
            onClick={()=> setNavOpen(!navOpen)}
          >
            <div className={`hamBox ${navOpen ? "hamBoxOpen" : ""}`}>
              <spna className={`lineTop ${navOpen ? "spin" : ""}`}></spna>
              <spna className={`lineBottom ${navOpen ? "spin": ""}`}></spna>
            </div>
          </div>

          {/* menu items */}
          <ul
            tabIndex={0}
            className={`bg-base-100 shadow nav-overlay ${navOpen ? 'top-0' : '-top-full'}`}
          >
            <div className="my-2 py-2 px-6 font-semibold border-b-2 hover:border-b-2 hover:text-[#AFD275] hover:border-[#afd275] w-full">
            <Link
              to={"/all-courses"}
            >
              All Courses
            </Link>
            </div>
            {user && user?.email ? (
              <>
                <Link
                  to={`/dashboard/${
                    isAdmin
                      ? "all-users"
                      : isTutor
                      ? "all-study-session"
                      : "student"
                  }`}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img alt={`${user?.name} photo`} src={user?.photoURL} />
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => handleSignOut()}
                  className="ms-2 py-3 px-6 bg-[#AFD275] text-[#2f4021] rounded-md hover:text-[#AFD275] hover:bg-[#2f4021]"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                {/* login and sign up btn */}
                <div className="font-semibold flex flex-col sm:flex-row">
                  <Link
                    to="/login"
                    className="my-2 py-2 px-6 border-b-2 hover:border-b-2 hover:text-[#AFD275] hover:border-[#afd275]"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/sign-up"}
                    className=" my-2 py-2 px-6 border-b-2 hover:border-b-2 hover:text-[#AFD275] hover:border-[#afd275]"
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
