import Banner from "../Banner/Banner"
import PopularCourses from "../PopularCourses/popularCourses"
import TutorSection from "../TutorSection/TutorSection"



function Home() {
  return (
    <div>
        {/* banner */}
        <Banner></Banner>

        {/* popular courses */}
        <section className="mt-[15vh]">
        <PopularCourses></PopularCourses>
        </section>

        {/* tutor section */}
        <section className="mt-[15vh]">
          <TutorSection></TutorSection>
        </section>

    </div>
  )
}

export default Home