import "./About.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import image1 from "../assets/javascript.png";
import image2 from "../assets/pngwing.com (2).png";
import image3 from "../assets/node.png";
import image4 from "../assets/mongodb.jpg";
import image5 from "../assets/express.png";
// import image6 from "../assets/html.png";
import image7 from "../assets/css.png";
import image8 from "../assets/python.png";
import image9 from "../assets/c++.png";
import image10 from "../assets/n8n.png";
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
import kartofferletter from "../assets/sagar experiene letter.pdf";
import work1 from "../assets/kartbuddy.jpeg";
import work2 from "../assets/kamyab.jpeg";
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
    company: "Kamyab Infotech PVT. LTD.",
    role: "Full-Stack Developer and AI Automation Intern",
    period: "Sep 2025 - Dec 2025",
    image: work2,
    bullets: [
      "Developed and shipped full-stack web features using Next.js and MongoDB.",
      "Created and managed multiple AI-driven automations using n8n, streamlining workflows and business processes.",
      "Built VCF (vCard) converter automations for bulk contact processing and format transformations.",
    ],
  },
  {
    company: "Studycafe PVT. LTD.",
    role: "Full-Stack Developer and AI Automation Engineer",
    period: "Jan 2026 - Present",
    image: "https://tasktracker24.com/studycafe_logo.jpg",
    bullets: [
      "Developed and maintained a full-stack Task Management SaaS application using Next.js, MongoDB, and Node.js.",
      "Designed and implemented AI-powered workflow automations using n8n and Python, reducing manual operational effort.",
      "Integrated Firebase Cloud Messaging (FCM) for real-time push notifications and task updates.",
      "Built and optimized REST APIs, database schemas, and backend services for scalable web applications.",
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
  // { name: "C", image: image10 },
  { name: "n8n", image: image10 },
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

  // Animation refs
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const educationInView = useInView(educationRef, { once: true, margin: "-100px" });
  const experienceInView = useInView(experienceRef, { once: true, margin: "-100px" });

  const openModal = (src) => {
    // use prefetched blob URL when available
    const srcToUse = prefetched[src] || src;
    // If the original resource is a PDF and we're on a small/mobile screen, open in a new tab
    try {
      const isPdf =
        typeof src === "string" && src.toLowerCase().endsWith(".pdf");
      const isMobile =
        typeof window !== "undefined" && window.innerWidth <= 768;
      if (isPdf && isMobile) {
        // prefer original src (not blob) for opening in new tab so browser handles it
        window.open(src, "_blank", "noopener,noreferrer");
        return;
      }
    } catch {
      // ignore and continue to modal
    }
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
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          About Me
        </motion.h2>
        <div className="about-content">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="about-content-flex">
              <motion.img
                src={gifImage}
                alt="Developer GIF"
                className="about-gif"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
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
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              My technical stack includes{" "}
              <strong>React.js, Node.js, Express.js,</strong> and
              <strong> MongoDB</strong>, along with{" "}
              <strong>JavaScript, Python, and C++</strong>. I am dedicated to{" "}
              <strong>problem-solving</strong> and{" "}
              <strong>continuous learning</strong>.
            </motion.p>
          </motion.div>
          <hr className="section-divider" />

          {/* Skills Section */}
          <motion.div
            ref={skillsRef}
            className="skills-section"
            initial={{ opacity: 0 }}
            animate={skillsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              className="skills-title"
              initial={{ opacity: 0, x: -50 }}
              animate={skillsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              Skills
            </motion.h3>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-card"
                  initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                  animate={
                    skillsInView
                      ? { opacity: 1, scale: 1, rotateY: 0 }
                      : { opacity: 0, scale: 0, rotateY: 180 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="skill-icon"
                  />
                  <p>{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <hr className="section-divider" />

          {/* Education Section */}
          <motion.div
            ref={educationRef}
            className="education-section"
            initial={{ opacity: 0 }}
            animate={educationInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              className="education-title"
              initial={{ opacity: 0, x: -50 }}
              animate={educationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              Education
            </motion.h3>
            <div className="education-container">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="education-item"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={
                    educationInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    type: "spring",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(102, 126, 234, 0.2)",
                  }}
                >
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
                </motion.div>
              ))}
            </div>
          </motion.div>
          <hr className="section-divider" />

          {/* Experience Section */}
          <motion.div
            ref={experienceRef}
            className="experience-section"
            initial={{ opacity: 0 }}
            animate={experienceInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              className="experience-title"
              initial={{ opacity: 0, x: -50 }}
              animate={experienceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              Experience
            </motion.h3>
            <div className="experience-container">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  className="experience-item"
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    experienceInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 50 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.2,
                    type: "spring",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
                  }}
                >
                  <motion.div
                    className="experience-logo"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={exp.image} alt={exp.company} />
                  </motion.div>
                  <div className="experience-details">
                    <h4>{exp.role}</h4>
                    <p className="experience-company">{exp.company}</p>
                    <ul className="experience-desc">
                      {exp.bullets.map((b, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            experienceInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{ delay: idx * 0.2 + i * 0.1 }}
                        >
                          {b}
                        </motion.li>
                      ))}
                    </ul>
                    {exp.offerLetter && (
                      <div className="offer-actions">
                        <motion.button
                          className="offer-btn"
                          onClick={() => openModal(exp.offerLetter)}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Certificate
                        </motion.button>
                      </div>
                    )}
                  </div>
                  <div className="experience-period">
                    <span>{exp.period}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
                  {modalContent &&
                  modalOriginalSrc &&
                  typeof modalOriginalSrc === "string" &&
                  modalOriginalSrc.toLowerCase().endsWith(".pdf") ? (
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
                <button
                  className="modal-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
