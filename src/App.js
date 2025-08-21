import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Hero from './components/Hero';
import ItineraryForm from './components/ItineraryForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import Features from './components/Features';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleItineraryGenerated = (data) => {
    setItinerary(data);
    setShowResults(true);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 500);
  };

  const handleNewItinerary = () => {
    setItinerary(null);
    setShowResults(false);
    // Smooth scroll to form
      document.getElementById('form')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <Header />
      
      <main>
        <Hero />
        
        <div id="form">
          <ItineraryForm 
            onItineraryGenerated={handleItineraryGenerated}
            setIsLoading={setIsLoading}
          />
        </div>

        <AnimatePresence>
          {showResults && itinerary && (
            <motion.div
              id="results"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ItineraryDisplay 
                itinerary={itinerary}
                onNewItinerary={handleNewItinerary}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Features />
      </main>

      <Footer />

      {isLoading && <LoadingSpinner />}
    </div>
  );
}

export default App;