import { create } from 'zustand';
import { RewardState, Reward } from '../types';
import { useAuthStore } from './authStore';

const REWARDS: Reward[] = [
  {
    id: 'reward-1',
    title: 'Premium Theme',
    description: 'Unlock a premium theme for your profile',
    cost: 100,
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  },
  {
    id: 'reward-2',
    title: 'Custom Badge',
    description: 'Get a unique badge to show off your achievements',
    cost: 200,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  },
  {
    id: 'reward-3',
    title: 'Streak Protector',
    description: 'Protect your streak for one missed day',
    cost: 300,
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d',
  },
];

export const useRewardStore = create<RewardState>((set, get) => ({
  rewards: REWARDS,

  redeemReward: (rewardId: string) => {
    const user = useAuthStore.getState().user;

    if (!user) {
      console.error('User not found');
      return;
    }

    const reward = REWARDS.find(r => r.id === rewardId);
    if (!reward) {
      console.error('Reward not found');
      return;
    }

    if (user.coins < reward.cost) {
      console.error('Insufficient coins');
      return;
    }

    const updatedUser = {
      ...user,
      coins: user.coins - reward.cost,
      redeemedRewards: [...(user.redeemedRewards || []), rewardId],
    };

    localStorage.setItem('habitHero_auth', JSON.stringify({ user: updatedUser }));
    useAuthStore.setState({ user: updatedUser });

    set({});  
  },

  canAffordReward: (rewardId: string) => {
    const user = useAuthStore.getState().user;
    const reward = REWARDS.find(r => r.id === rewardId);
    return user ? user.coins >= (reward?.cost || 0) : false;
  },

  hasRedeemed: (rewardId: string) => {
    const user = useAuthStore.getState().user;
    return user?.redeemedRewards?.includes(rewardId) || false;
  },
}));
