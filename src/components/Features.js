import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Globe, 
  Clock, 
  Heart, 
  Shield, 
  Zap,
  MapPin,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "Advanced artificial intelligence creates personalized itineraries based on your preferences, interests, and travel style.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Plan trips to over 50 countries with detailed information about local attractions, culture, and hidden gems.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Time Optimization",
      description: "Smart scheduling algorithms ensure you make the most of every moment with efficient route planning and timing.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description: "Every itinerary is tailored to your specific interests, budget, and travel preferences for a truly unique journey.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Your data is protected with enterprise-grade security, and all recommendations are verified for safety and quality.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate complete travel plans in seconds, not hours. Get instant access to your personalized itinerary.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Travelers", icon: Users },
    { number: "50+", label: "Countries Covered", icon: Globe },
    { number: "99%", label: "Satisfaction Rate", icon: Star },
    { number: "24/7", label: "AI Support", icon: Brain }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose AI Travel Planner?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of travel planning with cutting-edge AI technology 
            that understands your needs and creates perfect itineraries.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="floating-card h-full hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="floating-card mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12">
            How It Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Tell Us About You",
                description: "Share your destination, interests, budget, and travel style preferences.",
                icon: MapPin
              },
              {
                step: "2",
                title: "AI Magic Happens",
                description: "Our advanced AI analyzes your preferences and creates a personalized itinerary.",
                icon: Brain
              },
              {
                step: "3",
                title: "Start Your Adventure",
                description: "Download, share, or print your custom travel plan and begin exploring!",
                icon: Star
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="floating-card h-full">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                  
                  <div className="pt-8">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl">
                      <step.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h4>
                    
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;