import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/HomePage/Home/Home";
import Register from "../Pages/RegisterPage/Register/Register";
import SignIn from "../Pages/SignInPage/SignIn/SignIn";
import Dashboard from "../Pages/Dashboard/Dashboard";
import StudentHome from "../Pages/SudentDashboard/SutdentHome/StudentHome";
import SingleSessionStudy from "../Pages/SingleSession/SingleSessionStudy";
import PrivateRoute from "./PrivateRoute";
import CreateNote from "../Pages/SudentDashboard/Notes/CreateNote";
import ManageNote from "../Pages/SudentDashboard/Notes/ManageNote";
import UpdateNote from "../Pages/SudentDashboard/Notes/UpdateNote";
import CreateStudySession from "../Pages/TutorDashboard/CreateStudySession/CreateStudySession";
import AllStudySession from "../Pages/TutorDashboard/AllStudySession/AllStudySession";
import AllUsers from "../Pages/Admin/AllUsers/AllUsers";
import AllStudySessionAdmin from "../Pages/Admin/AllStudySession/AllStudySessionAdmin";
import UpdateStudySession from "../Pages/Admin/UpdateStudySession/UpdateStudySession";
import UploadMaterials from "../Pages/TutorDashboard/UploadMaterials/UploadMaterials";
import AllMaterials from "../Pages/TutorDashboard/AllMaterials/AllMaterials";
import UpdateMaterials from "../Pages/TutorDashboard/UpdateMaterials/UpdateMaterials";
import AllMaterialsInAdmin from "../Pages/Admin/AllMaterialsInAdmin/AllMaterialsInAdmin";
import StudentMaterials from "../Pages/SudentDashboard/StudentMaterials/StudentMaterials";
import AllCourses from "../Pages/AllCourses/AllCourses";
import TutorPrivateRoute from "./TutorPrivateRoute";
import AdminPivateRoute from "./AdminPivateRoute";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/sign-up',
          element: <Register></Register>
        },
        {
          path: "/login",
          element: <SignIn></SignIn>
        },
        {
          path: "/study-session/:id",
          element: <PrivateRoute><SingleSessionStudy></SingleSessionStudy></PrivateRoute>,
          loader: ({params}) => fetch(`https://online-tech-server-side.vercel.app/study-sessions?id=${params.id}`)
        },
        {
          path: "/all-courses",
          element: <AllCourses></AllCourses>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        // students
        {
          path: 'student',
          element: <StudentHome></StudentHome>
        },
        {
          path: 'create-note',
          element: <CreateNote></CreateNote>
        },
        {
          path: 'manage-note',
          element: <ManageNote></ManageNote>
        },
        {
          path: "update-note/:id",
          element: <UpdateNote></UpdateNote>,
          loader: ({params}) => fetch(`https://online-tech-server-side.vercel.app/notes?id=${params.id}`)
        },
        {
          path: "student-materials/:id",
          element: <StudentMaterials></StudentMaterials>,
          loader: ({params}) => fetch(`https://online-tech-server-side.vercel.app/materials?id=${params.id}`)
        },

        // tutor
        {
          path: "create-study-session",
          element: <TutorPrivateRoute><CreateStudySession></CreateStudySession></TutorPrivateRoute>
        },
        {
          path: "all-study-session",
          element: <TutorPrivateRoute><AllStudySession></AllStudySession></TutorPrivateRoute>
        },
        {
          path: "upload-materials/:id",
          element: <TutorPrivateRoute><UploadMaterials></UploadMaterials></TutorPrivateRoute>,
          loader: ({params}) => fetch(`https://online-tech-server-side.vercel.app/study-sessions?id=${params.id}`)
        },
        {
          path: "tutor-all-metarials",
          element: <TutorPrivateRoute><AllMaterials></AllMaterials></TutorPrivateRoute>
        },
        {
          path: "update-materials/:id",
          element: <TutorPrivateRoute><UpdateMaterials></UpdateMaterials></TutorPrivateRoute> ,
          loader: ({params}) => fetch(`https://online-tech-server-side.vercel.app/materials/single-material?id=${params.id}`)
        },
        // admin
        {
          path: "all-users",
          element: <AdminPivateRoute><AllUsers></AllUsers></AdminPivateRoute>
        },
        {
          path: "all-study-session-admin",
          element: <AdminPivateRoute><AllStudySessionAdmin></AllStudySessionAdmin></AdminPivateRoute>
        },
        {
          path: "update-study-session/:id",
          element: <AdminPivateRoute><UpdateStudySession></UpdateStudySession></AdminPivateRoute> ,
          loader: ({params}) => fetch(`https://online-tech-server-side.vercel.app/study-sessions?id=${params.id}`)
        },
        {
          path: "all-materials-admin",
          element: <AdminPivateRoute><AllMaterialsInAdmin></AllMaterialsInAdmin></AdminPivateRoute>
        }
      ]
    }
  ]);

  export default router;