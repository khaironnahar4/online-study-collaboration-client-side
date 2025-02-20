import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa6";
import { useForm } from "react-hook-form";

import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import useAuth from "../../../Auth/UseAuth/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGWBB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

function Register() {
  const axiosPublic = UseAxiosPublic();
  const { handleSignUp, setUser, handleGoogleSignin } = useAuth()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log(image_hosting_key);
  

  const handleFormSubmit = async (data) => {
    // console.log(data, data.image[0]);
    const imageFile = {image: data.image[0]};
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    })

    console.log(res.data.data.display_url);
    
    handleSignUp(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: data.name,
          photoURL: res.data.data.display_url
        })
          .then(() => {
            setUser(user);
            const userData = {
              name: data.name,
              email: data.email,
              role: data.role,
              image: res.data.data.display_url
            };
            axiosPublic.post("/users", userData).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Congratulation! You are registered.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
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
    <div className="hero register min-h-screen p-4">
      <div className="hero-content flex justify-center shadow-md lg:w-1/2 ">
        {/* <div className="text-center lg:text-left">
          <img src={registerImg} alt="register image" />
        </div> */}

        <div className="card w-full ">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="card-body">
            <h1 className="text-center text-[40px] font-semibold text-[#2f4021]">
              Sign Up
            </h1>

            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "You name is required" })}
                placeholder="Type here"
                className="input input-bordered"
              />
              {errors.name && (
                <p role="alert" className="text-red-700">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email Address is required",
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

           <div className="flex justify-between items-start gap-2">
             {/* image file */}
             <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                {...register("image", { required: "Choose your photo." })}
                className="file-input file-input-ghost file-input-bordered w-full max-w-xs"
              />
              {errors.image && (
                <p role="alert" className="text-red-700">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Choose your role */}
            <div className="form-control">
            <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select {...register("role", {required:true})} 
              className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                 Choose Your Role
                </option>
                <option>student</option>
                <option>tutor</option>
                {/* <option>admin</option> */}
              </select>
            </div>
           </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/i,
                  required: true,
                })}
                placeholder="Enter your password"
                className="input input-bordered"
              />
              {errors.password && (
                <p role="alert" className="text-red-700">
                  Password must be at least 6 digit and contain a letter, a
                  number and a special character
                </p>
              )}
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>

            <div className="form-control mt-6">
              <button className="w-full bg-[#afd275] text-white py-3 rounded-md">
                Sign up
              </button>
            </div>
          </form>

          <div className="flex flex-col justify-center items-center">
            <p className="text-[#afd275]">
              Already registered? Go to <Link to={"/login"}>Log in</Link>
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

              <div
                onClick={handleGoogleRegister}
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

export default Register;
