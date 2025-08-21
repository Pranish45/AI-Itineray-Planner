import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TravelPlanner from '../components/TravelPlanner';
import ItineraryDisplay from '../components/ItineraryDisplay';

const Planner = () => {
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  const handleItineraryGenerated = (itinerary) => {
    setGeneratedItinerary(itinerary);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!generatedItinerary ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                Plan Your Perfect Trip
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Let our AI create a personalized itinerary based on your preferences, 
                budget, and travel style. Get ready for an unforgettable adventure!
              </p>
            </div>
            
            <TravelPlanner onItineraryGenerated={handleItineraryGenerated} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold gradient-text">Your Itinerary</h1>
              <button
                onClick={() => setGeneratedItinerary(null)}
                className="btn-secondary"
              >
                Plan Another Trip
              </button>
            </div>
            
            <ItineraryDisplay itineraryData={generatedItinerary} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Planner;