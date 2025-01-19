import { Link } from "react-router-dom";
import useAuth from "../../Auth/UseAuth/useAuth";

function Navbar() {
  const { user, handleSignOut } = useAuth();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"} className="text-2xl font-bold">
          <span className="font-bold text-4xl text-[#AFD275]">E</span>Learn
        </Link>
      </div>
      <div className="flex-none">
        {user && user?.email ? (
          <>
            <Link to={'/dashboard/student'}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt={`${user?.name} photo`}
                  src={user?.photoURL}
                />
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
            <div className="dropdown dropdown-end font-semibold">
              <Link to='/login' 
              className="py-3 px-6 border border-black rounded-md hover:text-[#AFD275] hover:border-[#afd275]">
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

        {/* profile */}
        {/* <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
