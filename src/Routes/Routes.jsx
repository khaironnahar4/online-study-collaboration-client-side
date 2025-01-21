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
          loader: ({params}) => fetch(`http://localhost:5000/study-sessions?id=${params.id}`)
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
          loader: ({params}) => fetch(`http://localhost:5000/notes?id=${params.id}`)
        },
        // tutor
        {
          path: "create-study-session",
          element: <CreateStudySession></CreateStudySession>
        },
        {
          path: "all-study-session",
          element: <AllStudySession></AllStudySession>
        },
        {
          path: "upload-materials/:id",
          element: <UploadMaterials></UploadMaterials>,
          loader: ({params}) => fetch(`http://localhost:5000/study-sessions?id=${params.id}`)
        },
        {
          path: "tutor-all-metarials",
          element: <AllMaterials></AllMaterials>
        },
        {
          path: "update-materials/:id",
          element: <UpdateMaterials></UpdateMaterials>,
          loader: ({params}) => fetch(`http://localhost:5000/materials/single-material?id=${params.id}`)
        },
        // admin
        {
          path: "all-users",
          element: <AllUsers></AllUsers>
        },
        {
          path: "all-study-session-admin",
          element: <AllStudySessionAdmin></AllStudySessionAdmin>
        },
        {
          path: "update-study-session/:id",
          element: <UpdateStudySession></UpdateStudySession>,
          loader: ({params}) => fetch(`http://localhost:5000/study-sessions?id=${params.id}`)
        }
      ]
    }
  ]);

  export default router;