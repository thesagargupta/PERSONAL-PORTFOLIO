import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Project';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Home /> {/* Add the Home component here */}
     <About/>
      <Projects/>
      <section id="contact">
        <h1>Contact Section</h1>
      </section>
    </div>
  );
}


export default App;
