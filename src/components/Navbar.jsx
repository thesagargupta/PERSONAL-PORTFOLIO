import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons
import "./Navbar.css";

const Navbar = () => {
  const texts = ["<SAGAR/>"];
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const [activeItem, setActiveItem] = useState(""); // State to track the active menu item

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

  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menu after clicking on a menu item
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Handle active menu item selection
  const handleActiveItem = (item) => {
    setActiveItem(item); // Set the clicked item as active
    closeMenu(); // Close the menu after selection
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo" style={{ width: "130px", height: "25px", textAlign: "center" }}>
          {currentText}
        </div>
      </div>
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
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
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />} {/* Using React icons */}
      </div>
    </nav>
  );
};

export default Navbar;
