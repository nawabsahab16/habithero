import { Reward } from '../types';
import { AuthService } from './auth.service';


export class RewardService {
  static getRewards(): Reward[] {
    return [
      {
        id: 'reward-1',
        title: 'Premium Theme Pack',
        description: 'Unlock exclusive dark and light themes with custom color schemes. Stand out from the crowd!',
        cost: 100,
        image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809'
      },
      {
        id: 'reward-2',
        title: 'Streak Shield',
        description: 'Protect your streak for one missed day. Life happens, stay on track!',
        cost: 150,
        image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d'
      },
      {
        id: 'reward-3',
        title: 'Golden Badge',
        description: 'A prestigious badge showing your dedication to self-improvement',
        cost: 200,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
      },
      {
        id: 'reward-4',
        title: 'Productivity Power-Up',
        description: 'Earn 2x coins for completed tasks for the next 3 days',
        cost: 250,
        image: 'https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d'
      },
      {
        id: 'reward-5',
        title: 'Custom Avatar Frame',
        description: 'Add a unique animated frame to your profile picture',
        cost: 300,
        image: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139'
      },
      {
        id: 'reward-6',
        title: 'Milestone Marker',
        description: 'Highlight your achievements with special milestone animations',
        cost: 350,
        image: 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9'
      },
      {
        id: 'reward-7',
        title: 'Time Traveler',
        description: 'Ability to log tasks for the previous day, once per week',
        cost: 400,
        image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f'
      },
      {
        id: 'reward-8',
        title: 'Habit Master Title',
        description: 'An exclusive title that shows up on the leaderboard',
        cost: 500,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'
      },
      {
        id: 'reward-9',
        title: 'Task Themes',
        description: 'Customize your task list with beautiful themes and icons',
        cost: 300,
        image: 'https://images.unsplash.com/photo-1557683316-973673baf926'
      },
      {
        id: 'reward-10',
        title: 'Wisdom Pack',
        description: 'Unlock daily motivational quotes and habit-building tips',
        cost: 200,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'
      }
    ];
  }

  static async redeemReward(rewardId: string): Promise<void> {
    const user = AuthService.getCurrentUser();
    if (!user) {
      throw new Error('User must be logged in to redeem rewards');
    }

    const reward = this.getRewards().find(r => r.id === rewardId);
    if (!reward) {
      throw new Error('Reward not found');
    }

    if (user.coins < reward.cost) {
      throw new Error('Insufficient coins');
    }

    if (user.redeemedRewards?.includes(rewardId)) {
      throw new Error('Reward already redeemed');
    }

    await AuthService.updateUser({
      coins: user.coins - reward.cost,
      redeemedRewards: [...(user.redeemedRewards || []), rewardId]
    });
  }

  static canAffordReward(rewardId: string): boolean {
    const user = AuthService.getCurrentUser();
    const reward = this.getRewards().find(r => r.id === rewardId);
    return user ? user.coins >= (reward?.cost || 0) : false;
  }

  static hasRedeemed(rewardId: string): boolean {
    const user = AuthService.getCurrentUser();
    return user?.redeemedRewards?.includes(rewardId) || false;
  }
}