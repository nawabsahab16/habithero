import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Zap, Users, Star, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Set Clear Goals',
    description: 'Create personalized habits and set achievable daily targets that align with your long-term objectives.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Build Streaks',
    description: 'Stay motivated by maintaining daily streaks and watching your progress grow over time.'
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: 'Earn Rewards',
    description: 'Get coins for completing tasks and redeem them for exciting rewards and customizations.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community',
    description: 'Join a supportive community of like-minded individuals working towards their goals.'
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Achievement System',
    description: 'Unlock badges and achievements as you reach milestones in your habit-building journey.'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Progress Tracking',
    description: 'Visualize your growth with detailed statistics and progress indicators.'
  }
];

const About = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Transform Your Habits, Transform Your Life
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            HabitHero helps you build lasting habits through an engaging, reward-based system
            that makes personal development fun and sustainable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;