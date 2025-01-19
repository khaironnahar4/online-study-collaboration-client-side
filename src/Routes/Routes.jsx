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
        }
      ]
    }
  ]);

  export default router;