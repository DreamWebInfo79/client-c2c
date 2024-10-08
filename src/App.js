import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import CarDetails from './components/CarDetails';
import Admin from './components/admin/Admin';
import ScrollToTop from './components/ScrollToTop';
import usePageTracking from './hooks/usePageTracking';
import MyCars from './components/MyCars';
import { CarProvider } from './components/CarContext';
import { UserProvider } from './components/UserContext';
import WhatsAppMenu from './components/WhatsAppMenu';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import BottomNav from './components/BottomNav';
import SearchPage from './components/Search';
import TermsAndConditions from './components/TermsAndConditions';
import About from './components/About';

function App() {
  
  
  usePageTracking();


  return (
      <div className="App">
      <GoogleOAuthProvider clientId="920316076408-35gdcl6370m17toarg2qbipojrl2lqad.apps.googleusercontent.com">
       <UserProvider>
       <CarProvider>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/car/:brand/:id" element={<CarDetails />} />
          <Route path="/agent-login" element={<Admin />} />
          <Route path="/my-cars" element={<MyCars/>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
          {/* <Route path="/about-us" element={<About/>} /> */}
        </Routes>
        <Footer />
        <WhatsAppMenu />
        <BottomNav/>
       </CarProvider>
        </UserProvider>
        </GoogleOAuthProvider>
      </div>
  );
}

export default App;
