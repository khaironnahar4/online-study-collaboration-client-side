import { Outlet } from "react-router-dom"
import Footer from "../../Shared/Footer/Footer"
import Navbar from "../../Shared/Navbar/Navbar"

function MainLayout() {
  return (
    <div className="max-w-7xl mx-auto">
        {/* navbar */}
        <Navbar></Navbar>

        {/* outlet */}
        <Outlet></Outlet>
        
        {/* footer */}
        <Footer></Footer>
    </div>
  )
}

export default MainLayout