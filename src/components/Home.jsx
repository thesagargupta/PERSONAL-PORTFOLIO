import { FaDownload, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaSquareUpwork } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6"; // Import icons
import "./Home.css";
import photo5 from "../assets/photo4.jpg";
import resume from "../assets/sagar resume new.pdf"
const Home = () => {
  const handleDownloadCV = () => {
    // Replace with your CV file path
    const cvUrl = resume;
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
          </h1>
          <p className="description">
            Passionate developer with a love for creating innovative solutions.
            I specialize in web development and enjoy working with various
            technologies to bring ideas to life. My goal is to build
            applications that are not only functional but also user-friendly and
            visually appealing.🤠
          </p>

          {/* Location, CV Button, and Social Icons */}
          <div className="extra-info">
            <div className="location">
              <FaLocationDot /> <span>New Delhi, India</span>
            </div>
            <button className="cv-btn" onClick={handleDownloadCV}>
              <FaDownload /> Download CV
            </button>
          </div>

          {/* Social Icons */}
          <div className="social-icons">
            <a href="https://github.com/thesagargupta" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/sagargupta9193" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://wa.me/+918809197377" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
            <a href="https://www.upwork.com/freelancers/~0148c554e92a965360" target="_blank" rel="noopener noreferrer">
              <FaSquareUpwork/>
            </a>
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
