import { FaDownload } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6"; // Import icons
import "./Home.css";
import photo1 from "../assets/photo.jpg";
import photo2 from "../assets/photo1.jpg";
import photo3 from "../assets/photo2.jpg";
import photo4 from "../assets/photo3.jpg";
import photo5 from "../assets/photo4.jpg";

const Home = () => {
  const handleDownloadCV = () => {
    // Replace with your CV file path
    const cvUrl = "/path-to-your-cv.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Sagar_Gupta_CV.pdf";
    link.click();
  };

  return (
    <section id="home" className="home-section">
      <div className="home-container">
        <div className="intro-text">
          <h1>
            Hi, I&apos;m <span className="name">Sagar Gupta</span>
            <span className="hand-emoji">👋</span> {/* Add hand emoji with class */}
          </h1>
          <p className="description">
            I am a skilled Web Developer with expertise in the MERN stack,
            specializing in building dynamic and responsive websites and web
            applications. I have a strong foundation in programming languages
            such as C, C++, Java, and Python, with a particular focus on Data
            Structures and Algorithms (DSA) to solve complex problems
            efficiently.
          </p>

          {/* Location and CV Button */}
          <div className="extra-info">
            <div className="location">
              <FaLocationDot /> <span>New Delhi, India</span>
            </div>
            <button className="cv-btn" onClick={handleDownloadCV}>
              <FaDownload /> Download CV
            </button>
          </div>
        </div>
        <div className="image-container">
          <img src={photo5} alt="Sagar Gupta" className="profile-image" />
        </div>
      </div>
    </section>
  );
};

export default Home;
