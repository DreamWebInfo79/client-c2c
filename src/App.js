import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import CarDetails from './components/CarDetails';
import Admin from './components/admin/Admin';
import ScrollToTop from './components/ScrollToTop';
import usePageTracking from './hooks/usePageTracking';
import './App.css';

function App() {
  
  
  usePageTracking();


  return (
      <div className="App">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/agent-login" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
