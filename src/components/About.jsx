import "./About.css";
import image1 from "../assets/javascript.png";
import image2 from "../assets/pngwing.com (2).png";
import image3 from "../assets/node.png";
import image4 from "../assets/mongodb.jpg";
import image5 from "../assets/express.png";
// import image6 from "../assets/html.png";
import image7 from "../assets/css.png";
import image8 from "../assets/python.png";
import image9 from "../assets/c++.png";
import image10 from "../assets/c.png";
import image11 from "../assets/java.png";
import image12 from "../assets/git.png";
import image13 from "../assets/github.png";
// import image14 from "../assets/mysql.png";
import ru from "../assets/ru.png";
import dav from "../assets/dav.jpg";
import tcs from "../assets/tcs.jpg";
import gifImage from "../assets/gif.gif"; // Update with your actual path
import typescriptImg from "../assets/TypeScript.png";
import nextjsImg from "../assets/Next.js.png";
import { useState, useEffect } from "react";
import KuruviofferPDF from "../assets/Sagar intern OL.pdf";
import kartofferletter from "../assets/kartbuddy Intern offer letter Sagar Gupta.pdf";
import work1 from "../assets/kartbuddy.jpeg";
import work2 from "../assets/kuruvi.jpeg";
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

// Experience Data
const experiences = [
  {
    company: "kartBuddy",
    role: "MERN Stack Developer Intern",
    period: "Jun 2025 - Aug 2025",
    image: work1,
  offerLetter: kartofferletter,
    bullets: [
      "Built and shipped front-end features using React and modern CSS.",
      "Implemented RESTful APIs with Node.js and Express for product modules.",
      "Improved performance by optimizing database queries and reducing bundle size.",
    ],
  },
  {
    company: "Kuruvi Q Commerce Private Limited",
    role: "Software Developer Intern",
    period: "Jul 2025 - Dec 2025",
    image: work2,
    offerLetter: KuruviofferPDF,
    bullets: [
      "Created responsive, accessible UI components following design specs.",
      "Collaborated with designers to iterate on interaction patterns.",
      "Added unit tests and documentation for reusable components.",
    ],
  },
];

// Skills Data
const skills = [
  { name: "JavaScript", image: image1 },
  { name: "React.js", image: image2 },
  { name: "Node.js", image: image3 },
  { name: "MongoDB", image: image4 },
  { name: "Express.js", image: image5 },
  // { name: "HTML5", image: image6 },
  { name: "CSS3", image: image7 },
  { name: "Python", image: image8 },
  { name: "C++", image: image9 },
  { name: "C", image: image10 },
  { name: "Java", image: image11 },
  { name: "Git", image: image12 },
  { name: "Github", image: image13 },
  // { name: "MySQL", image: image14 },
  { name: "Next.js", image: nextjsImg },
  { name: "TypeScript", image: typescriptImg },
];

const About = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [prefetched, setPrefetched] = useState({});
  const [modalOriginalSrc, setModalOriginalSrc] = useState(null);

  const openModal = (src) => {
  // use prefetched blob URL when available
  const srcToUse = prefetched[src] || src;
  setModalOriginalSrc(src);
  setModalContent(srcToUse);
  setModalOpen(true);
  // if already prefetched, we can hide the loader immediately
  if (prefetched[src]) {
    // small delay to allow rendering kickoff
    setTimeout(() => setModalLoading(false), 100);
  } else {
    setModalLoading(true);
  }
  };

  // fallback: if loading remains for too long, clear spinner to avoid stuck state
  useEffect(() => {
    let t;
    if (modalOpen && modalLoading) {
      t = setTimeout(() => {
        setModalLoading(false);
      }, 15000); // 15s fallback
    }
    return () => clearTimeout(t);
  }, [modalOpen, modalLoading]);

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  setModalLoading(false);
  };

  // Prevent background scrolling when modal is open; restore on close
  useEffect(() => {
    if (modalOpen) {
      // save current overflow to restore later
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    return;
  }, [modalOpen]);

  // Prefetch offer-letter PDFs to improve load speed
  useEffect(() => {
    let active = true;
    const urls = experiences
      .map((e) => e.offerLetter)
      .filter(Boolean)
      .filter((u) => typeof u === "string" && u.toLowerCase().endsWith(".pdf"));

    const map = {};

    const fetchAll = async () => {
      await Promise.all(
        urls.map(async (url) => {
          try {
            const res = await fetch(url, { cache: "force-cache" });
            if (!res.ok) return;
            const blob = await res.blob();
            const objectUrl = URL.createObjectURL(blob);
            map[url] = objectUrl;
          } catch (err) {
            // log prefetch errors for troubleshooting; best-effort
            console.warn("Offer prefetch failed:", err, url);
          }
        })
      );
      if (active) setPrefetched((p) => ({ ...p, ...map }));
    };

    if (urls.length) fetchAll();

    return () => {
      active = false;
      // revoke created object URLs
      Object.values(map).forEach((u) => {
        if (u) {
          try {
            URL.revokeObjectURL(u);
          } catch (err) {
            console.warn("Failed to revoke object URL", err);
          }
        }
      });
    };
  }, []);

  // cleanup prefetched object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(prefetched).forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch (err) {
          console.warn("Failed to revoke prefetched object URL", err);
        }
      });
    };
  }, [prefetched]);
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-card">
            <div className="about-content-flex">
              <img src={gifImage} alt="Developer GIF" className="about-gif" />
              <p>
                I am a passionate Web and Software Developer with expertise in
                the <strong>MERN stack</strong>, as well as software development
                across a variety of technologies. I specialize in creating{" "}
                <strong>dynamic</strong> and <strong>scalable</strong> web
                applications, as well as developing efficient and robust
                software solutions. With a strong grasp of{" "}
                <strong>Data Structures and Algorithms (DSA)</strong>, I build{" "}
                <strong>efficient</strong> and <strong>high-performance</strong>{" "}
                applications, ensuring both functionality and seamless user
                experience.
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
          <hr className="section-divider" />

          {/* Experience Section */}
          <div className="experience-section">
            <h3 className="experience-title">Experience</h3>
            <div className="experience-container">
              {experiences.map((exp, idx) => (
                <div key={idx} className="experience-item">
                  <div className="experience-logo">
                    <img src={exp.image} alt={exp.company} />
                  </div>
                  <div className="experience-details">
                    <h4>{exp.role}</h4>
                    <p className="experience-company">{exp.company}</p>
                    <ul className="experience-desc">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    {exp.offerLetter && (
                      <div className="offer-actions">
                        <button
                          className="offer-btn"
                          onClick={() => openModal(exp.offerLetter)}
                        >
                          View Offer Letter
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="experience-period">
                    <span>{exp.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Modal for offer letters */}
          {modalOpen && (
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-scroll">
                              {modalLoading && (
                                <div className="modal-spinner" aria-hidden>
                                  <div className="spinner" />
                                </div>
                              )}
                              {modalContent && modalOriginalSrc && typeof modalOriginalSrc === "string" && modalOriginalSrc.toLowerCase().endsWith(".pdf") ? (
                                <iframe
                                  src={modalContent}
                                  title="Offer Letter"
                                  className="modal-iframe"
                                  onLoad={() => setModalLoading(false)}
                                />
                              ) : (
                                <img
                                  src={modalContent}
                                  alt="Offer Letter"
                                  className="modal-image"
                                  onLoad={() => setModalLoading(false)}
                                />
                              )}
                  </div>
                  <button className="modal-close" onClick={closeModal} aria-label="Close">Close</button>
                </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
