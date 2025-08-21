import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, DollarSign, Zap, Send, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ItineraryForm = ({ onItineraryGenerated, setIsLoading }) => {
  const [formData, setFormData] = useState({
    city: '',
    days: 1,
    interests: [],
    budget: 'moderate',
    travel_style: 'balanced'
  });

  const [interestInput, setInterestInput] = useState('');

  const interests = [
    'Culture & History', 'Food & Dining', 'Nature & Outdoors', 
    'Adventure & Sports', 'Art & Museums', 'Shopping', 
    'Nightlife', 'Relaxation', 'Photography', 'Local Life'
  ];

  const budgets = [
    { value: 'budget', label: 'Budget', icon: '💰', description: 'Affordable options' },
    { value: 'moderate', label: 'Moderate', icon: '💳', description: 'Balanced spending' },
    { value: 'luxury', label: 'Luxury', icon: '✨', description: 'Premium experiences' }
  ];

  const travelStyles = [
    { value: 'relaxed', label: 'Relaxed', icon: '😌', description: 'Take it easy' },
    { value: 'balanced', label: 'Balanced', icon: '⚖️', description: 'Mix of activities' },
    { value: 'adventurous', label: 'Adventurous', icon: '🏃', description: 'High energy' }
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.city.trim()) {
      toast.error('Please enter a destination city');
      return;
    }
    
    if (formData.interests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/generate-itinerary', formData);
      
      if (response.data.success) {
        onItineraryGenerated(response.data);
        toast.success('Your AI itinerary is ready! ✈️');
      } else {
        toast.error('Failed to generate itinerary. Please try again.');
      }
    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Plan Your Perfect Trip
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your dream destination and preferences, and let our AI create 
            a personalized itinerary just for you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="floating-card max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Destination */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary-500" />
              Where do you want to go?
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              placeholder="e.g., Paris, Tokyo, New York..."
              className="input-field text-lg"
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary-500" />
              How many days?
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="30"
                value={formData.days}
                onChange={(e) => setFormData(prev => ({ ...prev, days: parseInt(e.target.value) }))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-2xl font-bold text-primary-600 min-w-[3rem]">
                {formData.days} {formData.days === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-primary-500" />
              What interests you?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interests.map((interest) => (
                <motion.button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                    formData.interests.includes(interest)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300 text-gray-600 hover:text-primary-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {interest}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Budget & Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Budget */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary-500" />
                Budget Level
              </label>
              <div className="space-y-2">
                {budgets.map((budget) => (
                  <motion.button
                    key={budget.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, budget: budget.value }))}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.budget === budget.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{budget.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-700">{budget.label}</div>
                        <div className="text-sm text-gray-500">{budget.description}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary-500" />
                Travel Style
              </label>
              <div className="space-y-2">
                {travelStyles.map((style) => (
                  <motion.button
                    key={style.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, travel_style: style.value }))}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.travel_style === style.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{style.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-700">{style.label}</div>
                        <div className="text-sm text-gray-500">{style.description}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full btn-primary text-xl py-4 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-5 h-5" />
            <span>Generate AI Itinerary</span>
          </motion.button>

          <p className="text-center text-sm text-gray-500 mt-4">
            ✨ Our AI will create a personalized travel plan based on your preferences
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default ItineraryForm;