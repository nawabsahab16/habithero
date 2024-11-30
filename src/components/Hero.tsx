import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-indigo-100 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-8"
        >
          Build habits, earn rewards,
          <br />
          <span className="text-indigo-600">and level up your life!</span>
        </motion.h1>
        

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Transform your daily routines into rewarding achievements. Track habits, earn coins,
          and unlock exciting rewards while building a better you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex justify-center space-x-6"
        >
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform hover:scale-105 transition">
            Get Started
          </button>
          <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transform hover:scale-105 transition">
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
