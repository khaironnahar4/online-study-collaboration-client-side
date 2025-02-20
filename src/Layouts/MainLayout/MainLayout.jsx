import { Outlet } from "react-router-dom"
import Footer from "../../Shared/Footer/Footer"
import Navbar from "../../Shared/Navbar/Navbar"

function MainLayout() {
  return (
    <div className="overflow-x-hidden">
        {/* navbar */}
        <div className="w-full bg-base-100 fixed z-50 top-0">
        <Navbar></Navbar>
        </div>

        {/* outlet */}
        <div className="max-w-7xl mx-auto mt-16">

        <Outlet></Outlet>
        </div>
        
        {/* footer */}
        <Footer></Footer>
    </div>
  )
}

export default MainLayout