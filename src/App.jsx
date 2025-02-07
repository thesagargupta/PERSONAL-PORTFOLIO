import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Project';
import Contact from './components/Contact';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Home /> {/* Add the Home component here */}
     <About/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  );
}


export default App;
