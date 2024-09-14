import logo from './logo.svg';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarDetails from './components/CarDetails';
import Admin from './components/admin';
import ScrollToTop from './components/ScrollToTop';
// import BottomNav from './components/BottomNav';   
import './App.css';

import usePageTracking from './hooks/usePageTracking';

function App() {
  usePageTracking();
  return (
    <Router>
      <div className="App">
        <Navbar />
      <ScrollToTop />
        <Routes>
        {/* <Home/> */}
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/agent-login" element={<Admin />} />
        </Routes>
        <Footer />
        {/* <BottomNav /> */}
        
      </div>
    </Router>
  );
}

export default App;

