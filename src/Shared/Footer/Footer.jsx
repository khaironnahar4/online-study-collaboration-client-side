import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-[#2f4021] text-white pb-10">
      <div className="footer border-base-300 border-t px-10 py-4">
        <aside className="">
         <h1  className="text-3xl font-bold text-[#AFD275]">
         <span className="font-bold text-4xl ">E</span>Learn
         </h1>
          <p>Providing reliable tech since 2024</p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4 text-2xl">
            <a>
            <FaFacebook />
            </a>
            <a>
              <FaTwitter></FaTwitter>
            </a>
            <a>
             <FaYoutube></FaYoutube>
            </a>
            <a>
             <FaInstagram></FaInstagram>
            </a>
            <a>
             <FaLinkedin></FaLinkedin>
            </a>
          </div>
        </nav>
      </div>

      <div className="footer p-10 border-y border-[#afd275]">
        <nav>
          <h6 className="font-bold uppercase text-[#afd275]">Our Adrees</h6>
            <div className="flex items-center gap-2">
                <FaLocationDot className="text-[#afd275] text-xl"></FaLocationDot>
                <p>Chauddagram, Comilla <br />Bangladesh.</p>
            </div>
            <div className="flex items-center gap-2">
                <FaEnvelope className="text-[#afd275] text-xl"></FaEnvelope>
                <p>khaironnahar4@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
                <FaPhone className="text-[#afd275] text-xl"/>
                <p>019xxxxxx000</p>
            </div>
        </nav>
        <nav>
          <h6 className="font-bold uppercase text-[#afd275]">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="font-bold uppercase text-[#afd275]">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form className="w-80">
          <h6 className="font-bold text-3xl text-[#afd275]">Join our newsletter to keep up to date with us!</h6>
          <fieldset className="form-control w-80">
            <label className="label ">
              <span className="label-text text-white">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn bg-[#afd275] text-white hover:bg-[#2f4021] join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </div>

      <aside className="text-center pt-10">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Khairun
          Nahar.
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
