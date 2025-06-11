import { useState, useEffect } from "react";
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const texts = ["<SAGAR/>"];
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 200;
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex === texts[index].length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
      setCurrentText(texts[index].substring(0, charIndex + (isDeleting ? -1 : 1)));
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  const handleActiveItem = (item) => {
    setActiveItem(item);
  };

  const handleScroll = () => {
    const sections = ["home", "about", "projects", "contact"];
    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveItem(sectionId);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <div className="logo">{currentText}</div>
        </div>
        <ul className="nav-links">
          <li>
            <a
              href="#home"
              className={activeItem === "home" ? "active" : ""}
              onClick={() => handleActiveItem("home")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeItem === "about" ? "active" : ""}
              onClick={() => handleActiveItem("about")}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={activeItem === "projects" ? "active" : ""}
              onClick={() => handleActiveItem("projects")}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeItem === "contact" ? "active" : ""}
              onClick={() => handleActiveItem("contact")}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* WhatsApp style bottom nav for mobile only */}
      <div className="mobile-bottom-nav">
        <a href="#home" className={activeItem === "home" ? "active" : ""}>
          <FaHome />
          <span>Home</span>
        </a>
        <a href="#about" className={activeItem === "about" ? "active" : ""}>
          <FaUser />
          <span>About</span>
        </a>
        <a href="#projects" className={activeItem === "projects" ? "active" : ""}>
          <FaProjectDiagram />
          <span>Projects</span>
        </a>
        <a href="#contact" className={activeItem === "contact" ? "active" : ""}>
          <FaEnvelope />
          <span>Contact</span>
        </a>
      </div>
    </>
  );
};

export default Navbar;
