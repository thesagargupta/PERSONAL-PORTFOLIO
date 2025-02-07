import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import About from './components/About';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Home /> {/* Add the Home component here */}
     <About/>
      <section id="projects">
        <h1>Projects Section</h1>
      </section>
      <section id="contact">
        <h1>Contact Section</h1>
      </section>
    </div>
  );
}


export default App;
