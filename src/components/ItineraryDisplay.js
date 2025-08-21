import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, DollarSign, Download, Share2, RefreshCw, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ItineraryDisplay = ({ itinerary, onNewItinerary }) => {
  const [activeDay, setActiveDay] = useState(0);
  const [showMap, setShowMap] = useState(false);

  const formatItinerary = (itineraryData) => {
    if (itineraryData.format === 'text') {
      // Parse text format and structure it
      const lines = itineraryData.itinerary.split('\n');
      const days = [];
      let currentDay = null;
      
      lines.forEach(line => {
        if (line.includes('Day') || line.includes('DAY')) {
          if (currentDay) days.push(currentDay);
          currentDay = { title: line.trim(), activities: [] };
        } else if (currentDay && line.trim()) {
          currentDay.activities.push(line.trim());
        }
      });
      
      if (currentDay) days.push(currentDay);
      return days;
    }
    
    // Handle JSON format
    return itineraryData.itinerary;
  };

  const itineraryDays = formatItinerary(itinerary);

  const handleDownload = () => {
    const content = `AI Travel Itinerary for ${itinerary.city}\n\n${itinerary.itinerary}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `itinerary-${itinerary.city.toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My AI Travel Itinerary for ${itinerary.city}`,
          text: `Check out my AI-generated travel plan for ${itinerary.city}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.button
              onClick={onNewItinerary}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Your AI Itinerary
            </h2>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-lg text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary-500" />
              <span className="font-semibold">{itinerary.city}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              <span className="font-semibold">{itinerary.days} days</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={handleDownload}
              className="btn-secondary flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </motion.button>
            
            <motion.button
              onClick={handleShare}
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Itinerary Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Day Navigation */}
          <div className="lg:col-span-1">
            <div className="floating-card sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Journey</h3>
              <div className="space-y-2">
                {itineraryDays.map((day, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveDay(index)}
                    className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                      activeDay === index
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-semibold">Day {index + 1}</div>
                    <div className="text-sm opacity-90">
                      {day.title ? day.title.replace(/Day \d+/i, '').trim() : 'Adventures await!'}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Day Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="floating-card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Day {activeDay + 1}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Full Day</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Budget Friendly</span>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {itineraryDays[activeDay]?.activities ? (
                    <div className="space-y-4">
                      {itineraryDays[activeDay].activities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-gray-50 rounded-xl border-l-4 border-primary-500"
                        >
                          <ReactMarkdown>{activity}</ReactMarkdown>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">✨</div>
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">
                        Your AI-generated itinerary is ready!
                      </h4>
                      <p className="text-gray-500">
                        Explore the different days above to see your personalized travel plan.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="floating-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to start your adventure?
            </h3>
            <p className="text-gray-600 mb-6">
              Download your itinerary, share it with friends, or create a new one for another destination.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={onNewItinerary}
                className="btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Plan Another Trip</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ItineraryDisplay;