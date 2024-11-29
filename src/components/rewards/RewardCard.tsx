import React from 'react';
import { useRewardStore } from '../../store/rewardStore';
import { Reward } from '../../types';
import { Coins } from 'lucide-react';

interface RewardCardProps {
  reward: Reward;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  const { redeemReward, canAffordReward, hasRedeemed } = useRewardStore();
  const canAfford = canAffordReward(reward.id);
  const isRedeemed = hasRedeemed(reward.id);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src={reward.image}
        alt={reward.title}
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{reward.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{reward.description}</p>
        <div className="flex items-center mt-4">
          <Coins className="w-5 h-5 text-indigo-600 mr-1" />
          <span className="font-medium text-indigo-600">{reward.cost}</span>
        </div>
        <button
          onClick={() => redeemReward(reward.id)}
          disabled={!canAfford || isRedeemed}
          className={`mt-4 w-full py-2 px-4 rounded-md text-sm font-medium ${
            isRedeemed
              ? 'bg-green-100 text-green-800 cursor-not-allowed'
              : canAfford
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isRedeemed ? 'Redeemed' : canAfford ? 'Redeem Reward' : 'Not Enough Coins'}
        </button>
      </div>
    </div>
  );
};

export default RewardCard;