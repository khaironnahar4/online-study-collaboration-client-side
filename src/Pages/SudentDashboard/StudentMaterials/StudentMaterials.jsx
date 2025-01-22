import { Link, useLoaderData } from "react-router-dom"
import SectionTitle from "../../../Components/SectionTitle"


function StudentMaterials() {
    const materials = useLoaderData();
    // const [materials, setMaterials] = useState([]);
    // const axiosSecure = useAxiosSecure();

    // useEffect(()=>{
    //     axiosSecure.get(`/materials?id=${user?.email}`)
    //     .then(res =>{
    //         setMaterials(res.data);
    //     })

    // }, [])
  return (
    <div>
      <SectionTitle
        heading={`All Materials (${materials.length})`}
        subHeading="Your All Materials"
        // btnText="All Notes"
      ></SectionTitle>
      <div className="mt-[8vh] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full">
        {materials.map((material) => (
          <div key={material._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={material.image}
                alt="image"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{material.materialTitle}</h2>
              <p>Resource Link: <Link to={material.link}>{material.link}</Link></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentMaterials