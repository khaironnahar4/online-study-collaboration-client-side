import Button from "../../../Components/Button"


function Banner() {
  return (
    <section className="hero min-h-screen">
        <div className="hero-content text-center">
            <div className=" lg:max-w-3xl max-w-md">
            <h1 className="md:text-[5.5vw] text-4xl font-bold text-[#2f4021] md:leading-[5.3vw]">Unlock Your Future with <br /> <span>Online Learning</span></h1>
            <p className="py-6 text-[#2f4021]">Discover a wide range of expert-led courses tailored to your personal and professional growth. 
                Learn at your own pace, access resources anytime, and unlock new opportunities with flexible, 
                high-quality education designed for modern learners.</p>
            <div>
                <Button text="Browse Courses"></Button>
                <button 
                className="ms-3 py-3 px-6 border border-black rounded-md hover:text-[#AFD275] hover:border-[#afd275]">
                    Learn More
                    </button>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Banner