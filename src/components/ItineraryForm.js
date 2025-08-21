import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, DollarSign, Zap, Send, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const ItineraryForm = ({ onItineraryGenerated, isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState({
    city: '',
    days: 3,
    interests: '',
    budget: 'moderate',
    travel_style: 'balanced'
  });

  const [suggestions, setSuggestions] = useState([]);

  const interestSuggestions = [
    'Culture & History', 'Food & Dining', 'Nature & Outdoors', 'Shopping', 
    'Nightlife', 'Art & Museums', 'Adventure Sports', 'Relaxation', 
    'Photography', 'Local Markets', 'Architecture', 'Music & Entertainment'
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget', icon: '💰' },
    { value: 'moderate', label: 'Moderate', icon: '💳' },
    { value: 'luxury', label: 'Luxury', icon: '✨' }
  ];

  const travelStyleOptions = [
    { value: 'relaxed', label: 'Relaxed', icon: '😌' },
    { value: 'balanced', label: 'Balanced', icon: '⚖️' },
    { value: 'adventurous', label: 'Adventurous', icon: '🏃‍♂️' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestClick = (interest) => {
    const currentInterests = formData.interests.split(',').map(i => i.trim()).filter(i => i);
    if (!currentInterests.includes(interest)) {
      const newInterests = [...currentInterests, interest].join(', ');
      setFormData(prev => ({ ...prev, interests: newInterests }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.city.trim() || !formData.interests.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const interests = formData.interests.split(',').map(i => i.trim()).filter(i => i);
      
      const response = await fetch('http://localhost:5000/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: formData.city,
          days: parseInt(formData.days),
          interests: interests,
          budget: formData.budget,
          travel_style: formData.travel_style
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        onItineraryGenerated(data);
        toast.success('Your AI itinerary is ready! 🎉');
      } else {
        toast.error(data.error || 'Failed to generate itinerary');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Create Your Perfect{' '}
          <span className="gradient-text">AI Itinerary</span>
        </motion.h2>
        <motion.p 
          className="text-xl text-white/80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Tell us about your dream destination and let our AI create a personalized travel plan just for you.
        </motion.p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="floating-card p-8 lg:p-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* City Input */}
            <div>
              <label className="block text-white font-semibold mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                Destination City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g., Paris, Tokyo, New York"
                className="input-field"
                required
              />
            </div>

            {/* Days Input */}
            <div>
              <label className="block text-white font-semibold mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                Number of Days
              </label>
              <select
                name="days"
                value={formData.days}
                onChange={handleInputChange}
                className="input-field"
              >
                {[1, 2, 3, 4, 5, 6, 7, 10, 14, 21].map(days => (
                  <option key={days} value={days}>
                    {days} {days === 1 ? 'Day' : 'Days'}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Selection */}
            <div>
              <label className="block text-white font-semibold mb-3 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-blue-400" />
                Budget Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, budget: option.value }))}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      formData.budget === option.value
                        ? 'bg-blue-500/30 border-blue-400 text-white'
                        : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="text-xs font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Interests Input */}
            <div>
              <label className="block text-white font-semibold mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Your Interests
              </label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="e.g., Culture, Food, Nature, Shopping"
                className="input-field h-24 resize-none"
                required
              />
              
              {/* Interest Suggestions */}
              <div className="mt-3">
                <p className="text-white/60 text-sm mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {interestSuggestions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestClick(interest)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 text-xs transition-all duration-300 hover:scale-105"
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-white font-semibold mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-400" />
                Travel Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {travelStyleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, travel_style: option.value }))}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      formData.travel_style === option.value
                        ? 'bg-blue-500/30 border-blue-400 text-white'
                        : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="text-xs font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary text-lg px-12 py-4 flex items-center justify-center mx-auto space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Creating Your Itinerary...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Generate AI Itinerary</span>
              </>
            )}
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default ItineraryForm;