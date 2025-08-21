import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plane, MapPin, Calendar, Users, Sparkles, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    // GSAP animations for floating elements
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          y: -20,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.3
        });
      }
    });
  }, []);

  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Smart Destinations",
      description: "AI-curated locations based on your preferences"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Optimized Scheduling",
      description: "Perfect timing for every activity and attraction"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Personalized Experience",
      description: "Tailored to your interests, budget, and travel style"
    }
  ];

  const backgroundElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-br from-primary-200/30 to-accent-200/30 blur-xl"
            style={{
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: element.delay,
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={el => floatingElementsRef.current[0] = el}
          className="absolute top-20 left-20 text-primary-400 opacity-20"
        >
          <Plane className="w-12 h-12 transform rotate-45" />
        </div>
        <div
          ref={el => floatingElementsRef.current[1] = el}
          className="absolute top-32 right-32 text-accent-400 opacity-20"
        >
          <MapPin className="w-10 h-10" />
        </div>
        <div
          ref={el => floatingElementsRef.current[2] = el}
          className="absolute bottom-32 left-32 text-primary-400 opacity-20"
        >
          <Calendar className="w-8 h-8" />
        </div>
        <div
          ref={el => floatingElementsRef.current[3] = el}
          className="absolute bottom-20 right-20 text-accent-400 opacity-20"
        >
          <Sparkles className="w-14 h-14" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-accent-500 mr-2 animate-pulse" />
            <span className="text-accent-600 font-semibold text-lg">
              Powered by Advanced AI
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Plan Your Dream</span>
            <br />
            <span className="text-gray-800">Adventure</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create personalized, AI-powered travel itineraries that adapt to your preferences, 
            budget, and schedule. Experience the future of travel planning.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            to="/planner"
            className="btn-primary flex items-center justify-center group text-lg px-8 py-4"
          >
            Start Planning
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/destinations"
            className="btn-secondary flex items-center justify-center text-lg px-8 py-4"
          >
            Explore Destinations
            <MapPin className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="glass-effect p-6 rounded-2xl hover:shadow-glow transition-all duration-300 group"
            >
              <div className="text-primary-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: "10K+", label: "Itineraries Created" },
            { number: "150+", label: "Destinations" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "24/7", label: "AI Assistance" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;