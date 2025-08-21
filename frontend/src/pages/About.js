import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Globe, 
  Users, 
  Award, 
  Zap, 
  Heart,
  MapPin,
  Sparkles,
  CheckCircle,
  Target
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms analyze millions of data points to create personalized recommendations.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Coverage',
      description: 'Access to destinations worldwide with local insights and real-time information.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Personalized Experience',
      description: 'Every itinerary is uniquely crafted based on your preferences, budget, and travel style.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Generation',
      description: 'Get comprehensive travel plans in seconds, not hours of manual research.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Travelers' },
    { number: '200+', label: 'Destinations Covered' },
    { number: '1M+', label: 'Itineraries Created' },
    { number: '4.9/5', label: 'Average Rating' }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'AI Research Lead',
      bio: 'Former Google AI researcher with 10+ years in machine learning and travel tech.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Travel Experience Director',
      bio: 'World traveler who has visited 80+ countries and understands what makes trips memorable.'
    },
    {
      name: 'Emily Watson',
      role: 'Product Designer',
      bio: 'Award-winning UX designer focused on creating intuitive and delightful user experiences.'
    }
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Precision',
      description: 'Every recommendation is carefully calculated and personalized.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Passion',
      description: 'We love travel and want to share that passion with the world.'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Quality',
      description: 'We maintain the highest standards in our recommendations.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-accent-500 mr-3 animate-pulse" />
              <span className="text-accent-600 font-semibold text-lg">About Us</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Revolutionizing</span>
              <br />
              <span className="text-gray-800">Travel Planning</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make travel planning effortless and enjoyable. 
              Using cutting-edge AI technology, we create personalized itineraries 
              that help you discover the world like never before.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To democratize travel planning by making it accessible, intelligent, and personalized for everyone. 
              We believe that great adventures shouldn't require hours of research – they should be just a few clicks away.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-2xl text-center group hover:shadow-glow transition-all"
              >
                <div className="text-primary-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Travelers Worldwide
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of satisfied travelers who have discovered amazing destinations with our AI-powered platform
            </p>
          </motion.div>

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
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our diverse team of travel enthusiasts, AI experts, and designers work together 
              to create the best travel planning experience possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-2xl text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                
                <p className="text-primary-600 font-semibold mb-4">
                  {member.role}
                </p>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and help us deliver exceptional experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="text-primary-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of travelers who have discovered amazing destinations with our AI-powered platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary flex items-center justify-center text-lg px-8 py-4">
                <MapPin className="w-5 h-5 mr-2" />
                Start Planning
              </button>
              
              <button className="btn-secondary flex items-center justify-center text-lg px-8 py-4">
                <Globe className="w-5 h-5 mr-2" />
                Explore Destinations
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;