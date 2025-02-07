import { FaDownload } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6"; // Import icons
import "./Home.css";
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
            <span className="hand-emoji">👋</span>{" "}
            {/* Add hand emoji with class */}
          </h1>
          <p className="description">
            Passionate developer with a love for creating innovative solutions.
            I specialize in web development and enjoy working with various
            technologies to bring ideas to life. My goal is to build
            applications that are not only functional but also user-friendly and
            visually appealing.🤠
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
