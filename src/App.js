import logo from './logo.svg';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarDetails from './components/CarDetails';
import Admin from './components/admin';
import BottomNav from './components/BottomNav';   
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
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
        {/* <BottomNav /> */}
        
      </div>
    </Router>
  );
}

export default App;

