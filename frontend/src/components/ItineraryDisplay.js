import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Info, 
  Download, 
  Share2,
  Edit3,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  Navigation,
  Camera,
  Coffee,
  Utensils,
  Moon
} from 'lucide-react';
import toast from 'react-hot-toast';

const ItineraryDisplay = ({ itineraryData }) => {
  const [expandedDays, setExpandedDays] = useState(new Set([0]));
  const [selectedView, setSelectedView] = useState('timeline'); // timeline, map, list
  const [itinerary, setItinerary] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    if (itineraryData) {
      // Parse the itinerary data
      if (itineraryData.structured_data) {
        setItinerary(itineraryData.structured_data);
      } else {
        // Parse text-based itinerary
        setItinerary(parseTextItinerary(itineraryData.itinerary));
      }
    }
  }, [itineraryData]);

  const parseTextItinerary = (text) => {
    // Basic parsing for text-based itinerary
    const lines = text.split('\n');
    const days = [];
    let currentDay = null;
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.includes('Day') && trimmed.includes(':')) {
        if (currentDay) days.push(currentDay);
        currentDay = {
          day: days.length + 1,
          theme: trimmed,
          activities: [],
          morning: { activity: '', location: '', time: '9:00 AM - 12:00 PM' },
          afternoon: { activity: '', location: '', time: '1:00 PM - 5:00 PM' },
          evening: { activity: '', location: '', time: '6:00 PM - 10:00 PM' }
        };
      } else if (trimmed && currentDay) {
        if (trimmed.toLowerCase().includes('morning')) {
          currentDay.morning.activity = trimmed;
        } else if (trimmed.toLowerCase().includes('afternoon')) {
          currentDay.afternoon.activity = trimmed;
        } else if (trimmed.toLowerCase().includes('evening')) {
          currentDay.evening.activity = trimmed;
        }
      }
    });
    
    if (currentDay) days.push(currentDay);
    
    return {
      overview: {
        destination: itineraryData.city || 'Your Destination',
        duration: days.length,
        total_estimated_cost: 'Varies by preferences'
      },
      daily_itinerary: days,
      travel_insights: itineraryData.insights || {}
    };
  };

  const toggleDay = (dayIndex) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(dayIndex)) {
      newExpanded.delete(dayIndex);
    } else {
      newExpanded.add(dayIndex);
    }
    setExpandedDays(newExpanded);
  };

  const toggleFavorite = (dayIndex, activityType) => {
    const key = `${dayIndex}-${activityType}`;
    const newFavorites = new Set(favorites);
    if (newFavorites.has(key)) {
      newFavorites.delete(key);
      toast.success('Removed from favorites');
    } else {
      newFavorites.add(key);
      toast.success('Added to favorites');
    }
    setFavorites(newFavorites);
  };

  const getActivityIcon = (activityType) => {
    switch (activityType) {
      case 'morning':
        return <Coffee className="w-5 h-5 text-orange-500" />;
      case 'afternoon':
        return <Camera className="w-5 h-5 text-blue-500" />;
      case 'evening':
        return <Moon className="w-5 h-5 text-purple-500" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-500" />;
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination || !itinerary) return;

    const { source, destination } = result;
    const newItinerary = { ...itinerary };
    const sourceDayIndex = parseInt(source.droppableId.split('-')[1]);
    const destDayIndex = parseInt(destination.droppableId.split('-')[1]);
    
    // Handle drag and drop logic here
    // This is a simplified version - you'd implement full reordering logic
    toast.success('Itinerary updated!');
  };

  const exportItinerary = () => {
    const data = JSON.stringify(itinerary, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${itinerary?.overview?.destination || 'itinerary'}-plan.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Itinerary exported!');
  };

  const shareItinerary = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My ${itinerary?.overview?.destination} Travel Plan`,
          text: `Check out my ${itinerary?.overview?.duration}-day itinerary for ${itinerary?.overview?.destination}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (!itinerary) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              {itinerary.overview.destination} Adventure
            </h1>
            <p className="text-gray-600 text-lg">
              {itinerary.overview.duration} days of amazing experiences
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={exportItinerary}
              className="btn-secondary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={shareItinerary}
              className="btn-primary flex items-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 mb-6">
          {['timeline', 'list', 'map'].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-4 py-2 rounded-lg capitalize transition-all ${
                selectedView === view
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect p-6 rounded-2xl"
        >
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-primary-600 mr-3" />
            <h3 className="font-semibold text-lg">Duration</h3>
          </div>
          <p className="text-3xl font-bold gradient-text">
            {itinerary.overview.duration} Days
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect p-6 rounded-2xl"
        >
          <div className="flex items-center mb-4">
            <DollarSign className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="font-semibold text-lg">Budget</h3>
          </div>
          <p className="text-lg font-medium text-gray-700">
            {itinerary.overview.total_estimated_cost}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect p-6 rounded-2xl"
        >
          <div className="flex items-center mb-4">
            <Star className="w-6 h-6 text-yellow-500 mr-3" />
            <h3 className="font-semibold text-lg">Activities</h3>
          </div>
          <p className="text-3xl font-bold gradient-text">
            {itinerary.daily_itinerary.length * 3}
          </p>
        </motion.div>
      </div>

      {/* Daily Itinerary */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="space-y-6">
          {itinerary.daily_itinerary.map((day, dayIndex) => (
            <motion.div
              key={dayIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.1 }}
              className="glass-effect rounded-2xl overflow-hidden"
            >
              {/* Day Header */}
              <div
                className="p-6 cursor-pointer hover:bg-white/30 transition-all"
                onClick={() => toggleDay(dayIndex)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {day.day}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Day {day.day}
                      </h3>
                      <p className="text-gray-600">{day.theme}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-500">
                      3 activities
                    </div>
                    {expandedDays.has(dayIndex) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Day Activities */}
              <AnimatePresence>
                {expandedDays.has(dayIndex) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Droppable droppableId={`day-${dayIndex}`}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="px-6 pb-6 space-y-4"
                        >
                          {['morning', 'afternoon', 'evening'].map((timeSlot, activityIndex) => {
                            const activity = day[timeSlot];
                            const favoriteKey = `${dayIndex}-${timeSlot}`;
                            
                            return (
                              <Draggable
                                key={`${dayIndex}-${timeSlot}`}
                                draggableId={`${dayIndex}-${timeSlot}`}
                                index={activityIndex}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 transition-all ${
                                      snapshot.isDragging ? 'shadow-lg scale-105' : 'hover:shadow-md'
                                    }`}
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-start space-x-4 flex-1">
                                        <div className="flex-shrink-0">
                                          {getActivityIcon(timeSlot)}
                                        </div>
                                        
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                              <Clock className="w-4 h-4 text-gray-400" />
                                              <span className="text-sm text-gray-600 font-medium">
                                                {activity.time}
                                              </span>
                                            </div>
                                            
                                            <button
                                              onClick={() => toggleFavorite(dayIndex, timeSlot)}
                                              className={`p-1 rounded-full transition-colors ${
                                                favorites.has(favoriteKey)
                                                  ? 'text-red-500 hover:text-red-600'
                                                  : 'text-gray-400 hover:text-red-500'
                                              }`}
                                            >
                                              <Heart className={`w-4 h-4 ${
                                                favorites.has(favoriteKey) ? 'fill-current' : ''
                                              }`} />
                                            </button>
                                          </div>
                                          
                                          <h4 className="font-semibold text-gray-800 mb-2 capitalize">
                                            {timeSlot} Activity
                                          </h4>
                                          
                                          <p className="text-gray-700 mb-2">
                                            {activity.activity}
                                          </p>
                                          
                                          {activity.location && (
                                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                              <MapPin className="w-4 h-4 mr-1" />
                                              {activity.location}
                                            </div>
                                          )}
                                          
                                          {activity.cost && (
                                            <div className="flex items-center text-sm text-green-600 mb-2">
                                              <DollarSign className="w-4 h-4 mr-1" />
                                              {activity.cost}
                                            </div>
                                          )}
                                          
                                          {activity.tips && (
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                                              <div className="flex items-start">
                                                <Info className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-blue-700">
                                                  {activity.tips}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center space-x-2 ml-4">
                                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                          <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                          <Navigation className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </DragDropContext>

      {/* Travel Insights */}
      {itinerary.travel_insights && Object.keys(itinerary.travel_insights).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-effect p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-bold gradient-text mb-6">Travel Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(itinerary.travel_insights).map(([key, value]) => (
              <div key={key} className="bg-white/50 rounded-xl p-4">
                <h3 className="font-semibold text-lg mb-2 capitalize">
                  {key.replace(/_/g, ' ')}
                </h3>
                <p className="text-gray-700">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Alternative Activities */}
      {itinerary.alternative_activities && itinerary.alternative_activities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 glass-effect p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-bold gradient-text mb-6">Alternative Activities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {itinerary.alternative_activities.map((activity, index) => (
              <div key={index} className="bg-white/50 rounded-xl p-4 text-center">
                <p className="text-gray-700">{activity}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ItineraryDisplay;