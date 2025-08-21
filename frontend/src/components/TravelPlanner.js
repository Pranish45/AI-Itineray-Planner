import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Heart, 
  Sparkles, 
  Send,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const TravelPlanner = ({ onItineraryGenerated }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [interests, setInterests] = useState([]);
  const [ws, setWs] = useState(null);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      city: '',
      days: 3,
      budget: 'medium',
      travel_style: 'balanced',
      accommodation_type: 'hotel'
    }
  });

  const watchedValues = watch();

  // Interest categories
  const interestOptions = [
    { value: 'culture', label: '🏛️ Culture & History', category: 'Culture' },
    { value: 'food', label: '🍜 Food & Cuisine', category: 'Food' },
    { value: 'nature', label: '🌲 Nature & Outdoors', category: 'Nature' },
    { value: 'adventure', label: '🏔️ Adventure Sports', category: 'Adventure' },
    { value: 'nightlife', label: '🌃 Nightlife & Entertainment', category: 'Entertainment' },
    { value: 'shopping', label: '🛍️ Shopping', category: 'Shopping' },
    { value: 'art', label: '🎨 Art & Museums', category: 'Culture' },
    { value: 'beach', label: '🏖️ Beach & Water Activities', category: 'Nature' },
    { value: 'photography', label: '📸 Photography', category: 'Photography' },
    { value: 'wellness', label: '🧘 Wellness & Spa', category: 'Relaxation' },
    { value: 'music', label: '🎵 Music & Festivals', category: 'Entertainment' },
    { value: 'architecture', label: '🏗️ Architecture', category: 'Culture' }
  ];

  const budgetOptions = [
    { value: 'budget', label: '💰 Budget-Friendly', description: 'Under $100/day' },
    { value: 'medium', label: '💳 Moderate', description: '$100-300/day' },
    { value: 'luxury', label: '💎 Luxury', description: '$300+/day' }
  ];

  const travelStyleOptions = [
    { value: 'relaxed', label: '🛋️ Relaxed', description: 'Slow pace, lots of downtime' },
    { value: 'balanced', label: '⚖️ Balanced', description: 'Mix of activities and rest' },
    { value: 'packed', label: '⚡ Action-Packed', description: 'Maximum activities, minimal downtime' }
  ];

  const accommodationOptions = [
    { value: 'hostel', label: '🏠 Hostel', description: 'Budget-friendly, social' },
    { value: 'hotel', label: '🏨 Hotel', description: 'Comfortable, full service' },
    { value: 'resort', label: '🏖️ Resort', description: 'All-inclusive luxury' },
    { value: 'airbnb', label: '🏡 Airbnb', description: 'Local experience, flexible' }
  ];

  const steps = [
    { title: 'Destination', icon: <MapPin className="w-5 h-5" /> },
    { title: 'Duration', icon: <Calendar className="w-5 h-5" /> },
    { title: 'Interests', icon: <Heart className="w-5 h-5" /> },
    { title: 'Preferences', icon: <Users className="w-5 h-5" /> },
    { title: 'Generate', icon: <Sparkles className="w-5 h-5" /> }
  ];

  // WebSocket connection for real-time updates
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const websocket = new WebSocket(wsUrl);
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'progress') {
        setProgress(prev => Math.min(prev + 20, 90));
        toast.loading(data.message, { id: 'generation-progress' });
      } else if (data.type === 'result') {
        setProgress(100);
        setIsGenerating(false);
        toast.success('Itinerary generated successfully!', { id: 'generation-progress' });
        onItineraryGenerated(data.data);
      }
    };
    
    websocket.onerror = () => {
      console.log('WebSocket connection failed, falling back to HTTP');
    };
    
    setWs(websocket);
    
    return () => {
      websocket.close();
    };
  }, [onItineraryGenerated]);

  const onSubmit = async (data) => {
    if (interests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }

    setIsGenerating(true);
    setProgress(10);

    const requestData = {
      ...data,
      interests: interests.map(i => i.value)
    };

    try {
      if (ws && ws.readyState === WebSocket.OPEN) {
        // Use WebSocket for real-time updates
        ws.send(JSON.stringify(requestData));
      } else {
        // Fallback to HTTP request
        const response = await fetch('/api/generate-itinerary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error('Failed to generate itinerary');
        }

        const result = await response.json();
        setIsGenerating(false);
        toast.success('Itinerary generated successfully!');
        onItineraryGenerated(result);
      }
    } catch (error) {
      setIsGenerating(false);
      setProgress(0);
      toast.error('Failed to generate itinerary. Please try again.');
      console.error('Error:', error);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="destination"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">Where do you want to go?</h2>
              <p className="text-gray-600">Enter your dream destination</p>
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('city', { required: 'Destination is required' })}
                type="text"
                placeholder="e.g., Tokyo, Paris, New York..."
                className="input-field pl-12 w-full text-lg h-14"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.city.message}
                </p>
              )}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="duration"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">How long is your trip?</h2>
              <p className="text-gray-600">Select the number of days</p>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('days', { 
                    required: 'Duration is required',
                    min: { value: 1, message: 'Minimum 1 day' },
                    max: { value: 30, message: 'Maximum 30 days' }
                  })}
                  type="number"
                  min="1"
                  max="30"
                  className="input-field pl-12 w-32 text-center text-lg h-14"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  days
                </span>
              </div>
            </div>
            
            {errors.days && (
              <p className="text-red-500 text-sm text-center flex items-center justify-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.days.message}
              </p>
            )}

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[3, 7, 14].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setValue('days', days)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    watchedValues.days === days
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="text-2xl font-bold">{days}</div>
                  <div className="text-sm text-gray-600">
                    {days === 3 ? 'Weekend' : days === 7 ? 'Week' : 'Extended'}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="interests"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">What interests you?</h2>
              <p className="text-gray-600">Select your travel interests (choose multiple)</p>
            </div>
            
            <Select
              isMulti
              options={interestOptions}
              value={interests}
              onChange={setInterests}
              placeholder="Select your interests..."
              className="text-lg"
              classNamePrefix="react-select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  minHeight: '56px',
                  border: '1px solid rgba(209, 213, 219, 0.5)',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                }),
                multiValue: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  color: '#1d4ed8',
                  fontWeight: '500',
                }),
              }}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
              {interestOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    const isSelected = interests.some(i => i.value === option.value);
                    if (isSelected) {
                      setInterests(interests.filter(i => i.value !== option.value));
                    } else {
                      setInterests([...interests, option]);
                    }
                  }}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    interests.some(i => i.value === option.value)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">Your travel preferences</h2>
              <p className="text-gray-600">Customize your experience</p>
            </div>
            
            {/* Budget */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary-600" />
                Budget Range
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {budgetOptions.map((option) => (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      {...register('budget')}
                      type="radio"
                      value={option.value}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all ${
                      watchedValues.budget === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}>
                      <div className="font-semibold text-lg">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Travel Style</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {travelStyleOptions.map((option) => (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      {...register('travel_style')}
                      type="radio"
                      value={option.value}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all ${
                      watchedValues.travel_style === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}>
                      <div className="font-semibold text-lg">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Accommodation */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Accommodation Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {accommodationOptions.map((option) => (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      {...register('accommodation_type')}
                      type="radio"
                      value={option.value}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all ${
                      watchedValues.accommodation_type === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}>
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-xs text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="generate"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6 text-center"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">Ready to generate your itinerary?</h2>
              <p className="text-gray-600">Review your preferences and let AI create your perfect trip</p>
            </div>
            
            {/* Summary */}
            <div className="glass-effect p-6 rounded-2xl text-left max-w-md mx-auto">
              <h3 className="font-semibold text-lg mb-4 text-center">Trip Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Destination:</span>
                  <span className="font-medium">{watchedValues.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{watchedValues.days} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium capitalize">{watchedValues.budget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Style:</span>
                  <span className="font-medium capitalize">{watchedValues.travel_style}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-gray-600">Interests:</span>
                  <div className="text-right">
                    {interests.slice(0, 3).map((interest, index) => (
                      <div key={index} className="text-sm font-medium">
                        {interest.label.split(' ')[0]}
                      </div>
                    ))}
                    {interests.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{interests.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {isGenerating && (
              <div className="mt-8">
                <div className="flex items-center justify-center mb-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-600 mr-3" />
                  <span className="text-lg font-medium">Generating your itinerary...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-gray-600">This may take a few moments...</p>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                index <= currentStep
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  step.icon
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-4 ${
                  index < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={
                (currentStep === 0 && !watchedValues.city) ||
                (currentStep === 2 && interests.length === 0)
              }
              className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isGenerating || interests.length === 0}
              className="btn-primary px-8 py-3 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Generate Itinerary
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TravelPlanner;