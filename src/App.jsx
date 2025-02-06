import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Home /> {/* Add the Home component here */}
      <section id="about">
        <h1>About Section</h1>
      </section>
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
