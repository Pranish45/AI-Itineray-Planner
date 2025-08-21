import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Calendar, Filter, Heart } from 'lucide-react';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'urban', label: 'Urban Culture' },
    { id: 'nature', label: 'Nature & Relaxation' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'romance', label: 'Romance & Art' },
  ];

  const sampleDestinations = [
    {
      id: 1,
      name: 'Tokyo, Japan',
      category: 'urban',
      image: '/api/placeholder/400/300',
      rating: 4.8,
      highlights: ['Technology', 'Food', 'Culture', 'Shopping'],
      best_season: 'Spring/Fall',
      description: 'A vibrant metropolis where ancient traditions meet cutting-edge technology.',
      estimated_cost: '$150-300/day'
    },
    {
      id: 2,
      name: 'Paris, France',
      category: 'romance',
      image: '/api/placeholder/400/300',
      rating: 4.9,
      highlights: ['Museums', 'Architecture', 'Cuisine', 'History'],
      best_season: 'Spring/Summer',
      description: 'The City of Light offers unparalleled art, culture, and culinary experiences.',
      estimated_cost: '$120-250/day'
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      category: 'nature',
      image: '/api/placeholder/400/300',
      rating: 4.7,
      highlights: ['Beaches', 'Temples', 'Nature', 'Wellness'],
      best_season: 'Dry Season',
      description: 'Tropical paradise with stunning beaches, ancient temples, and wellness retreats.',
      estimated_cost: '$50-120/day'
    },
    {
      id: 4,
      name: 'New York, USA',
      category: 'urban',
      image: '/api/placeholder/400/300',
      rating: 4.6,
      highlights: ['Entertainment', 'Food', 'Museums', 'Shopping'],
      best_season: 'Spring/Fall',
      description: 'The city that never sleeps, offering world-class entertainment and dining.',
      estimated_cost: '$180-400/day'
    },
    {
      id: 5,
      name: 'Swiss Alps, Switzerland',
      category: 'adventure',
      image: '/api/placeholder/400/300',
      rating: 4.9,
      highlights: ['Skiing', 'Hiking', 'Scenic Views', 'Adventure'],
      best_season: 'Winter/Summer',
      description: 'Breathtaking mountain landscapes perfect for outdoor adventures.',
      estimated_cost: '$200-500/day'
    },
    {
      id: 6,
      name: 'Santorini, Greece',
      category: 'romance',
      image: '/api/placeholder/400/300',
      rating: 4.8,
      highlights: ['Sunsets', 'Architecture', 'Wine', 'Romance'],
      best_season: 'Spring/Summer',
      description: 'Stunning island with iconic white buildings and spectacular sunsets.',
      estimated_cost: '$100-250/day'
    },
  ];

  useEffect(() => {
    // Simulate API call
    setDestinations(sampleDestinations);
  }, []);

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (destinationId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(destinationId)) {
      newFavorites.delete(destinationId);
    } else {
      newFavorites.add(destinationId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Explore Amazing Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your next adventure from our curated collection of world-class destinations
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl overflow-hidden card-hover group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-r from-primary-400 to-accent-400 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => toggleFavorite(destination.id)}
                    className={`p-2 rounded-full backdrop-blur-sm border border-white/30 transition-all ${
                      favorites.has(destination.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${
                      favorites.has(destination.id) ? 'fill-current' : ''
                    }`} />
                  </button>
                </div>
                
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <MapPin className="w-16 h-16 opacity-50" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{destination.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-medium text-gray-600">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                      +{destination.highlights.length - 3} more
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Best time:
                    </span>
                    <span className="font-medium">{destination.best_season}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Estimated cost:</span>
                    <span className="font-medium text-green-600">{destination.estimated_cost}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full mt-6 btn-primary py-3">
                  Plan Trip to {destination.name.split(',')[0]}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No destinations found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Destinations;