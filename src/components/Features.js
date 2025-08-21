import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Globe, Clock, Shield, Zap, Users, MapPin, Star } from 'lucide-react';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Planning',
      description: 'Advanced machine learning algorithms create personalized itineraries based on your preferences, budget, and travel style.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access to comprehensive data for destinations worldwide, from major cities to hidden gems off the beaten path.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      title: 'Smart Scheduling',
      description: 'Intelligent time management that considers opening hours, travel time, and optimal visit sequences for maximum efficiency.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Your data is protected with enterprise-grade security. We never share your personal information with third parties.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate complete itineraries in seconds, not hours. Our optimized AI delivers results faster than traditional planning.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Personalized Experience',
      description: 'Every itinerary is uniquely crafted for you, considering your interests, budget, and travel preferences.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: MapPin,
      title: 'Real-time Updates',
      description: 'Stay informed with live updates on attractions, weather, and local events that might affect your plans.',
      color: 'from-teal-500 to-blue-500'
    },
    {
      icon: Star,
      title: 'Local Insights',
      description: 'Discover authentic experiences and hidden gems that most tourists miss, curated by our AI trained on local knowledge.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose{' '}
            <span className="gradient-text">AI Travel Planner</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the future of travel planning with cutting-edge technology that makes every journey extraordinary.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="floating-card p-6 h-full hover:bg-white/20 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="floating-card p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Travel Experience?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have already discovered the magic of AI-powered itinerary planning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Planning Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;