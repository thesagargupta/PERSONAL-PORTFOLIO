import "./Project.css";
import { FaGithub } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import proj1 from "../assets/cargame.png";
import proj2 from "../assets/portfolio.jpg";
import proj3 from "../assets/virtual.jpg";
import proj4 from "../assets/shoopers.png";
import proj5 from "../assets/musicofile.png";
import proj6 from "../assets/calculator.png";
import video1 from "../assets/record1.mp4";
import video2 from "../assets/record2.mp4";
import video3 from "../assets/record3.mp4";
import video4 from "../assets/record4.mp4";
import video5 from "../assets/record5.mp4";
import video6 from "../assets/record6.mp4";
import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/javascript.png";
import react from "../assets/pngwing.com (2).png";
import node from "../assets/node.png";
import mongo from "../assets/mongodb.jpg";
import express from "../assets/express.png";
import python from "../assets/python.png";

// Project Data Array
const projects = [
  {
    title: "CAR GAME",
    description:
      "I have created this car game with the help of HTML, CSS, and JavaScript. Play this game on your PC or Laptop.",
    image: proj1,
    video: video1,
    technologies: [
      { name: "HTML", icon: html },
      { name: "CSS", icon: css },
      { name: "JavaScript", icon: js },
    ],
    github: "https://github.com/thesagargupta/Car-Game-Js",
    website: "https://sagarcargame.netlify.app",
  },
  {
    title: "PERSONAL PORTFOLIO",
    description:
      "I have created my personal portfolio website, showcasing my details and experience. It is connected with a serverless database.",
    image: proj2,
    video: video2,
    technologies: [
      { name: "React.js", icon: react },
      { name: "Node.js", icon: node },
      { name: "MongoDB", icon: mongo },
      { name: "Express.js", icon: express },
    ],
    github: "",
    website: "https://sagarguptaportfolio.netlify.app/",
  },
  {
    title: "VIRTUAL ASSISTANT",
    description:
      "A Python-based AI voice assistant that plays songs on Spotify, reads news headlines, and provides weather forecasts, all via voice commands.",
    image: proj3,
    video: video3,
    technologies: [{ name: "Python", icon: python }],
    github: "https://github.com/thesagargupta/virtual_assistant",
    website: "https://sagarassistant.netlify.app/",
  },
  {
    title: "SHOPPING WEBSITE",
    description:
      "A full-stack eCommerce website built with the MERN stack, featuring an admin panel for managing products and orders.",
    image: proj4,
    video: video4,
    technologies: [
      { name: "React.js", icon: react },
      { name: "Node.js", icon: node },
      { name: "MongoDB", icon: mongo },
      { name: "Express.js", icon: express },
    ],
    github: "https://github.com/thesagargupta/Shoopers-Ecommerce",
    website: "https://shoopers.netlify.app/",
  },
  {
    title: "MUSICOFILE",
    description:
    "It is a music playing web application which play songs that are stored in the database and it play song on the same site without redirecting user to other sites.",
    image: proj5,
    video: video5,
    technologies: [
      { name: "HTML", icon: html },
      { name: "CSS", icon: css },
      { name: "JavaScript", icon: js },
    ],
    github: "https://github.com/thesagargupta/music-player",
    website: "https://musicofile.netlify.app",
  },
  {
    title: "CALCULATOR",
    description:
    "I have created this simple Calculator in which user can perform all types of arithmetic operation. it’s design exactly look like real Calculator.",
    image: proj6,
    video: video6,
    technologies: [
      { name: "HTML", icon: html },
      { name: "CSS", icon: css },
      { name: "JavaScript", icon: js },
    ],
    github: "https://github.com/thesagargupta/Calculator",
    website: "https://guptajeekacalculator.netlify.app/",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-media">
                <img src={project.image} alt={project.title} className="project-image" />
                {project.video && (
                  <video
                    src={project.video}
                    className="project-video"
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => e.target.pause()}
                  ></video>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tech-stack">
                  {project.technologies.map((tech, idx) => (
                    <div key={idx} className="tech-item">
                      <img src={tech.icon} alt={tech.name} className="tech-icon" />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
                <div className="project-buttons">
                  <a
                    href={project.github}
                    className="btn github-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="github-icon" /> GitHub
                  </a>
                  <a
                    href={project.website}
                    className="btn website-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsGlobe className="globe-icon" /> Preview
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
