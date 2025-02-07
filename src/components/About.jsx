import "./About.css";
import image1 from "../assets/javascript.png";
import image2 from "../assets/pngwing.com (2).png";
import image3 from "../assets/node.png";
import image4 from "../assets/mongodb.jpg";
import image5 from "../assets/express.png";
import image6 from "../assets/html.png";
import image7 from "../assets/css.png";
import image8 from "../assets/python.png";
import image9 from "../assets/c++.png";
import image10 from "../assets/c.png";
import image11 from "../assets/java.png";
import image12 from "../assets/git.png";
import ru from "../assets/ru.png";
import dav from "../assets/dav.jpg";
import tcs from "../assets/tcs.jpg";
import gifImage from "../assets/gif.gif"; // Update with your actual path

// Education Data
const education = [
  {
    institute: "University of Rajasthan",
    degree: "Bachelor of Computer Applications (BCA)",
    year: "2022 - 2025",
    image: ru, // Change to your actual image path
  },
  {
    institute: "DAV Rukmini Banarasi Kedia School, Birgunj, Nepal",
    degree: "Intermediate",
    year: "2020 - 2022",
    image: dav, // Change to your actual image path
  },
  {
    institute: "Chandrasheel Vidyapeeth, Kanti, Muzaffarpur, Bihar",
    degree: "Matriculation",
    year: "2020",
    image: tcs, // Change to your actual image path
  },
];

// Skills Data
const skills = [
  { name: "JavaScript", image: image1 },
  { name: "React.js", image: image2 },
  { name: "Node.js", image: image3 },
  { name: "MongoDB", image: image4 },
  { name: "Express.js", image: image5 },
  { name: "HTML5", image: image6 },
  { name: "CSS3", image: image7 },
  { name: "Python", image: image8 },
  { name: "C++", image: image9 },
  { name: "C", image: image10 },
  { name: "Java", image: image11 },
  { name: "Git", image: image12 },
];

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-card">
            <div className="about-content-flex">
              <img src={gifImage} alt="Developer GIF" className="about-gif" />
              <p>
                I am a passionate Web Developer with expertise in the{" "}
                <strong>MERN stack</strong>, creating <strong>dynamic</strong>{" "}
                and <strong>scalable</strong> web applications. With a strong
                grasp of <strong>Data Structures and Algorithms (DSA)</strong>,
                I build <strong>efficient</strong> and{" "}
                <strong>high-performance</strong> solutions.
              </p>
            </div>
            <p>
              My technical stack includes{" "}
              <strong>React.js, Node.js, Express.js,</strong> and
              <strong> MongoDB</strong>, along with{" "}
              <strong>JavaScript, Python, and C++</strong>. I am dedicated to{" "}
              <strong>problem-solving</strong> and{" "}
              <strong>continuous learning</strong>.
            </p>
          </div>
          <hr className="section-divider" />

          {/* Skills Section */}
          <div className="skills-section">
            <h3 className="skills-title">Skills</h3>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="skill-icon"
                  />
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="section-divider" />

          {/* Education Section */}
          <div className="education-section">
            <h3 className="education-title">Education</h3>
            <div className="education-container">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-icon">
                    <img src={edu.image} alt={edu.institute} />
                  </div>
                  <div className="education-details">
                    <h4>{edu.institute}</h4>
                    <p>{edu.degree}</p>
                  </div>
                  <div className="education-year">
                    <span>{edu.year}</span>
                    <p>{edu.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
