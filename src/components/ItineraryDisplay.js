import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, DollarSign, Download, Share2, Heart, Star } from 'lucide-react';

const ItineraryDisplay = ({ itinerary }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const formatItinerary = (itineraryData) => {
    if (itineraryData.format === 'text') {
      // Parse text format and convert to structured format
      const text = itineraryData.itinerary;
      const days = [];
      const dayRegex = /(?:Day|Day\s+\d+)[:\s]*/gi;
      const sections = text.split(dayRegex).filter(Boolean);
      
      sections.forEach((section, index) => {
        if (section.trim()) {
          const dayContent = section.trim();
          const morningMatch = dayContent.match(/(?:Morning|🌅)[:\s]*(.*?)(?=(?:Afternoon|🌞|Evening|🌙|$))/is);
          const afternoonMatch = dayContent.match(/(?:Afternoon|🌞)[:\s]*(.*?)(?=(?:Evening|🌙|$))/is);
          const eveningMatch = dayContent.match(/(?:Evening|🌙)[:\s]*(.*?)$/is);
          
          days.push({
            day: index + 1,
            morning: morningMatch ? morningMatch[1].trim() : '',
            afternoon: afternoonMatch ? afternoonMatch[1].trim() : '',
            evening: eveningMatch ? eveningMatch[1].trim() : '',
            tips: '',
            estimatedCost: '$50-100'
          });
        }
      });
      
      return days.length > 0 ? days : [{ day: 1, morning: 'Explore the city', afternoon: 'Visit local attractions', evening: 'Enjoy dinner', tips: 'Start your adventure!', estimatedCost: '$50-100' }];
    }
    
    // If it's already structured, return as is
    return itineraryData.itinerary || [];
  };

  const formattedDays = formatItinerary(itinerary);

  const handleDownload = () => {
    const content = formattedDays.map(day => 
      `Day ${day.day}:\nMorning: ${day.morning}\nAfternoon: ${day.afternoon}\nEvening: ${day.evening}\nTips: ${day.tips}\nEstimated Cost: ${day.estimatedCost}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${itinerary.city}-itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${itinerary.city} Travel Itinerary`,
          text: `Check out my AI-generated ${itinerary.days}-day itinerary for ${itinerary.city}!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Your {itinerary.days}-Day Adventure in{' '}
          <span className="gradient-text">{itinerary.city}</span>
        </h2>
        <p className="text-xl text-white/80 mb-8">
          AI-crafted itinerary based on your interests: {itinerary.interests.join(', ')}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download size={20} />
            <span>Download PDF</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="btn-secondary flex items-center space-x-2"
          >
            <Share2 size={20} />
            <span>Share</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`btn-secondary flex items-center space-x-2 ${
              isLiked ? 'bg-red-500/30 border-red-400' : ''
            }`}
          >
            <Heart size={20} className={isLiked ? 'fill-red-400' : ''} />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Day Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        {formattedDays.map((day, index) => (
          <button
            key={day.day}
            onClick={() => setSelectedDay(index)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedDay === index
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            Day {day.day}
          </button>
        ))}
      </motion.div>

      {/* Itinerary Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="floating-card p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Day Overview */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/20"
                >
                  <div className="text-6xl font-bold text-white mb-2">
                    {formattedDays[selectedDay].day}
                  </div>
                  <div className="text-white/80 font-medium">Day of Adventure</div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Estimated Cost:</span>
                      <span className="text-white font-semibold">
                        {formattedDays[selectedDay].estimatedCost}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Weather:</span>
                      <span className="text-white font-semibold">☀️ Perfect</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Day Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Morning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-6 rounded-2xl border border-orange-500/30"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🌅</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Morning</h3>
                    <p className="text-white/70">Start your day right</p>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {formattedDays[selectedDay].morning || 'Explore the city and discover local attractions to kickstart your adventure.'}
                </p>
              </motion.div>

              {/* Afternoon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6 rounded-2xl border border-blue-500/30"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🌞</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Afternoon</h3>
                    <p className="text-white/70">Adventure continues</p>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {formattedDays[selectedDay].afternoon || 'Continue your exploration with exciting activities and cultural experiences.'}
                </p>
              </motion.div>

              {/* Evening */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-500/30"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🌙</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Evening</h3>
                    <p className="text-white/70">Unwind and relax</p>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {formattedDays[selectedDay].evening || 'End your day with a relaxing evening, enjoying local cuisine and entertainment.'}
                </p>
              </motion.div>

              {/* Tips Section */}
              {formattedDays[selectedDay].tips && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-500/30"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mr-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Pro Tips</h3>
                      <p className="text-white/70">Local insights</p>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed">
                    {formattedDays[selectedDay].tips}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ItineraryDisplay;