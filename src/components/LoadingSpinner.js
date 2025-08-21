import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="floating-card p-8 text-center max-w-sm mx-4">
        {/* Animated Plane */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <Plane className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Loading Text */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Creating Your Itinerary
        </h3>
        <p className="text-gray-600 mb-6">
          Our AI is crafting the perfect travel plan for you...
        </p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-primary-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 3,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 p-4 bg-gray-50 rounded-xl"
        >
          <p className="text-sm text-gray-600">
            💡 <span className="font-medium">Did you know?</span> Our AI analyzes thousands of travel experiences to create your perfect itinerary.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;