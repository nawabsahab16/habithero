import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-indigo-200 to-white pt-20">
  
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-200 to-indigo-50"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8"
        >
          Build habits, earn rewards,
          <br />
          <motion.span
            className="text-indigo-600"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            and level up your life!
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Transform your daily routines into rewarding achievements. Track habits, earn coins,
          and unlock exciting rewards while building a better you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex justify-center space-x-4"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 15px rgba(75, 85, 99, 0.3)',
            }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transform transition duration-300"
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 15px rgba(75, 85, 99, 0.3)',
            }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transform transition duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
