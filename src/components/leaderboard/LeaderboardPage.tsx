import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';

const mockLeaderboard = [
  { id: 1, username: 'habitMaster', streak: 45, coins: 890 },
  { id: 2, username: 'dailyAchiever', streak: 38, coins: 760 },
  { id: 3, username: 'goalGetter', streak: 32, coins: 645 },
  { id: 4, username: 'streakChampion', streak: 28, coins: 560 },
  { id: 5, username: 'taskWarrior', streak: 25, coins: 500 },
];

const LeaderboardPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Global Leaderboard</h1>
        <p className="text-gray-600">Compete with others and climb the ranks!</p>
      </motion.div>

      <div className="space-y-4">
        {mockLeaderboard.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              {index === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
              {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
              {index === 2 && <Award className="w-6 h-6 text-amber-600" />}
              <span className={`font-bold ${index < 3 ? 'text-lg' : 'text-base'}`}>
                #{index + 1}
              </span>
              <span className="font-medium text-gray-900">{user.username}</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-indigo-600">
                <span className="font-medium">{user.streak}</span>
                <span className="text-sm ml-1">day streak</span>
              </div>
              <div className="text-indigo-600 font-medium">
                {user.coins} coins
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;