
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa6";
import { useForm } from "react-hook-form";



import Swal from "sweetalert2";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import useAuth from "../../../Auth/UseAuth/useAuth";


function SignIn() {
  const axiosPublic = UseAxiosPublic();
  const {handleSignin, setUser, handleGoogleSignin} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';
  // console.log(from);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    // console.log(data);
    handleSignin(data.email, data.password)
    .then(userCredential =>{
      const user = userCredential.user;
      setUser(user);
      navigate(from);
    })
    .catch(error =>{
      console.log(error.message);
    })
    
  };


 const handleGoogleRegister = () => {
     handleGoogleSignin()
       .then((result) => {
         const user = result?.user;
         setUser(user);
         const userData = {
           name: user?.displayName,
           email: user?.email,
           role: "Student",
           image: user?.photoURL
         };
         console.log(userData);
         
         axiosPublic.post("/users", userData).then((res) => {
           if (res.data.insertedId) {
             Swal.fire({
               position: "top-end",
               icon: "success",
               title: "Congratulation! You are log in",
               showConfirmButton: false,
               timer: 1500,
             });
           } else {
             console.log(res.data);
           }
           navigate("/");
         });
       })
       .catch((error) => {
         console.log(error.message);
       });
   };

  return (
    <div className="hero register min-h-screen">
      <div className="hero-content flex lg:w-1/2">

        <div className="card w-full">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="card-body">
            <h1 className="text-center text-[40px] font-semibold">Log in</h1>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Put your email address",
                })}
                placeholder="Type here"
                className="input input-bordered"
                
              />
              {errors.email && (
                <p role="alert" className="text-red-700">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                })}
                placeholder="Enter your password"
                className="input input-bordered"
                
              />
              {errors.password && (
                <p role="alert" className="text-red-700">
                  Please give the currect password.
                </p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* submit button */}
            <div className="form-control mt-6">
              <button
                className="w-full bg-[#afd275] text-white py-3 rounded-md"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="flex flex-col justify-center items-center">
            <p className="text-[#afd275]">
              New here? <Link to={"/sign-up"}>Create a new account</Link>
            </p>
            <p className="py-6">Or sign up with</p>
            <div className="flex justify-center items-center gap-5">
              <div
                className="text-xl font-bold w-12 h-12
                 border-2 border-black rounded-full 
                 flex justify-center items-center cursor-pointer"
              >
                <FaFacebookF />
              </div>

              <div onClick={handleGoogleRegister}
                className="text-xl font-bold w-12 h-12
                 border-2 border-black rounded-full 
                 flex justify-center items-center cursor-pointer"
              >
                <FaGoogle />
              </div>

              <div
                className="text-xl font-bold w-12 h-12
                 border-2 border-black rounded-full 
                 flex justify-center items-center cursor-pointer"
              >
                <FaGithub />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
