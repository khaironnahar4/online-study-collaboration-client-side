import Button from "./Button"


function SectionTitle({heading, subHeading, btnText}) {
  return (
    <div className="flex flex-col items-center mx-auto">
        <p className="text-[#afd275] font-semibold bg-[#2f4021] rounded-full px-4 py-2 inline">{subHeading}</p>
        <div className="my-12">
        <h1 className="md:text-[4vw] text-3xl text-[#2f4021] font-bold">{heading}</h1>
        </div>
        <div>
            {
            btnText &&
            <Button text={btnText}></Button>
            }
        </div>
    </div>
  )
}

export default SectionTitle