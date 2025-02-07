import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Automatically fetches the current year

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-title">SAGAR GUPTA</h2>
          <p className="copyright">© {currentYear} All rights reserved.</p>
        </div>

        <div className="footer-right">
          <a href="https://github.com/thesagargupta" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/sagargupta9193" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.facebook.com/sagargupta.offi/" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://instagram.com/sagargupta.official" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://x.com/offisagargupta" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
