import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TravelPlanner from './components/TravelPlanner';
import ItineraryDisplay from './components/ItineraryDisplay';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Planner from './pages/Planner';
import Destinations from './pages/Destinations';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="App min-h-screen">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
        
        <Navbar />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;