import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Hero from './components/Hero';
import ItineraryForm from './components/ItineraryForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleItineraryGenerated = (data) => {
    setItinerary(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
          },
        }}
      />
      
      <Header />
      
      <main>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-16"
        >
          <ItineraryForm 
            onItineraryGenerated={handleItineraryGenerated}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {itinerary && (
            <motion.div
              key="itinerary"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="container mx-auto px-4 pb-16"
            >
              <ItineraryDisplay itinerary={itinerary} />
            </motion.div>
          )}
        </AnimatePresence>

        <Features />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;