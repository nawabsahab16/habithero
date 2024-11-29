import React from 'react';
import { useRewardStore } from '../store/rewardStore';
import { useAuthStore } from '../store/authStore';
import RewardCard from '../components/rewards/RewardCard';
import { Coins } from 'lucide-react';

const RewardsPage = () => {
  const { rewards } = useRewardStore();
  const user = useAuthStore(state => state.user);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rewards Store</h1>
          <p className="text-gray-600">Redeem your coins for exciting rewards</p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full">
          <Coins className="w-5 h-5 text-indigo-600" />
          <span className="font-medium text-indigo-600">{user.coins} coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;