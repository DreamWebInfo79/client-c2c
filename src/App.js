import logo from './logo.svg';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarDetails from './components/CarDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        {/* <Home/> */}
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

