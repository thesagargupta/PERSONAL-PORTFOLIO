import './Home.css';
import photo1 from '../assets/photo.jpg'
import photo2 from '../assets/photo1.jpg'
import photo3 from '../assets/photo2.jpg'
const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-container">
        <div className="intro-text">
          <h1>Hi, I&apos;m <span className="name">Sagar Gupta👋</span></h1>
          <p className="description">I&apos;m a passionate web developer, crafting beautiful and functional websites and applications.</p>
        </div>
        <div className="image-container">
          <img src={photo2} alt="Sagar Gupta" className="profile-image" />
        </div>
      </div>
    </section>
  );
};

export default Home;
