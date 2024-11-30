import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "How does the habit tracker work?",
    answer: "Our app allows you to create and track habits on a daily, weekly, or custom schedule. Simply add your habits, check them off as you complete them, and monitor your progress over time!"
  },
  {
    question: "What is gamification, and how does it work in the app?",
    answer: "Gamification makes building habits fun and rewarding! You'll earn points, unlock badges, and build streaks as you complete your habits. Compete with yourself or friends to stay motivated."
  },
  {
    question: "Can I edit or delete a habit after I create it?",
    answer: "Yes! You can easily update, modify, or delete a habit from your dashboard at any time."
  },
  {
    question: "Does the app send reminders to complete habits?",
    answer: "Absolutely! You can set personalized reminders to ensure you never forget to complete your habits."
  },
  {
    question: "Is my progress data safe?",
    answer: "Yes, we prioritize your privacy. Your habit data is securely stored, and we follow strict privacy policies to ensure your information is safe."
  },
  {
    question: "Can I sync the app across multiple devices?",
    answer: "Yes, as long as you log in with the same account, your data will sync across all your devices in real time."
  },
  {
    question: "Are there any premium features?",
    answer: "While the basic app is free, premium features like advanced analytics, exclusive rewards, and custom habit templates are available through a subscription plan."
  },
  {
    question: "What happens if I miss a habit?",
    answer: "Missing a habit will reset your streak for that habit, but don't worry! You can always start fresh and build momentum again."
  },
  {
    question: "Can I share my progress with friends?",
    answer: "Yes, you can share your achievements or compete on the leaderboard with friends to stay motivated together."
  },
  {
    question: "How do I contact support if I have issues?",
    answer: "You can reach out to our support team through the Contact Us page or email us at support@habithero.com. We're happy to help!"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to know about HabitHero
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center"
              >
                <span className="font-medium text-gray-900 dark:text-white text-left">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;