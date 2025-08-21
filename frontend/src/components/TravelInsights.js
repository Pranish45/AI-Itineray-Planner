import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, DollarSign, Clock, MapPin, Users, Star } from 'lucide-react';

const TravelInsights = ({ data }) => {
  // Sample data for visualizations
  const budgetBreakdown = [
    { category: 'Accommodation', amount: 400, percentage: 35, color: '#3b82f6' },
    { category: 'Food & Dining', amount: 300, percentage: 26, color: '#10b981' },
    { category: 'Activities', amount: 250, percentage: 22, color: '#f59e0b' },
    { category: 'Transportation', amount: 150, percentage: 13, color: '#ef4444' },
    { category: 'Shopping', amount: 50, percentage: 4, color: '#8b5cf6' }
  ];

  const dailySpending = [
    { day: 'Day 1', amount: 180, activities: 3 },
    { day: 'Day 2', amount: 220, activities: 4 },
    { day: 'Day 3', amount: 160, activities: 3 },
    { day: 'Day 4', amount: 200, activities: 4 },
    { day: 'Day 5', amount: 190, activities: 3 }
  ];

  const popularTimes = [
    { time: '9 AM', popularity: 65 },
    { time: '11 AM', popularity: 85 },
    { time: '1 PM', popularity: 90 },
    { time: '3 PM', popularity: 75 },
    { time: '5 PM', popularity: 60 },
    { time: '7 PM', popularity: 80 },
    { time: '9 PM', popularity: 70 }
  ];

  const insights = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Total Budget',
      value: '$1,150',
      change: '+12%',
      trend: 'up',
      description: 'Compared to similar trips'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Activity Hours',
      value: '42 hrs',
      change: '+8%',
      trend: 'up',
      description: 'Packed with experiences'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Locations',
      value: '15',
      change: 'Perfect',
      trend: 'neutral',
      description: 'Optimal coverage'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Avg Rating',
      value: '4.8/5',
      change: 'Excellent',
      trend: 'up',
      description: 'Top-rated experiences'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-primary-600">{insight.icon}</div>
              <div className={`flex items-center text-sm font-medium ${
                insight.trend === 'up' ? 'text-green-600' :
                insight.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {insight.trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
                {insight.change}
              </div>
            </div>
            
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              {insight.title}
            </h3>
            <p className="text-2xl font-bold text-gray-800 mb-2">
              {insight.value}
            </p>
            <p className="text-xs text-gray-500">
              {insight.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Budget Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Budget Breakdown</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percentage }) => `${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {budgetBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 space-y-2">
            {budgetBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700">{item.category}</span>
                </div>
                <span className="font-medium text-gray-800">${item.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Daily Spending */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Daily Spending</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="amount" 
                  fill="url(#colorGradient)" 
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Popular Times */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect p-6 rounded-2xl lg:col-span-2"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Best Times to Visit Attractions
          </h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={popularTimes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="popularity"
                  stroke="#10b981"
                  fill="url(#colorGradient2)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Travel Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-effect p-6 rounded-2xl"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Smart Travel Tips</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Save 15%</h4>
            <p className="text-sm text-gray-600">
              Book activities in advance to get better rates
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Peak Hours</h4>
            <p className="text-sm text-gray-600">
              Visit popular spots before 11 AM or after 4 PM
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Local Experience</h4>
            <p className="text-sm text-gray-600">
              Try local transportation for authentic experiences
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TravelInsights;