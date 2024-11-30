import { storage } from './storage';
import { User } from '../types';
import { AuthService } from './auth.service';

const LEADERBOARD_KEY = 'habitHero_leaderboard';

interface LeaderboardEntry {
  userId: string;
  username: string;
  coins: number;
  streak: number;
  lastUpdated: string;
}

export class LeaderboardService {
  static getLeaderboard(): LeaderboardEntry[] {
    const entries = storage.get(LEADERBOARD_KEY) || [];
    return entries.sort((a: LeaderboardEntry, b: LeaderboardEntry) => {
      if (b.coins !== a.coins) {
        return b.coins - a.coins;
      }
      return b.streak - a.streak;
    });
  }

  static async updateUserStats(userId: string, coins: number, streak: number): Promise<void> {
    const user = AuthService.getCurrentUser();
    if (!user || user.id !== userId) {
      throw new Error('Unauthorized to update stats');
    }

    const entries = this.getLeaderboard();
    const existingEntry = entries.find(entry => entry.userId === userId);

    const updatedEntry: LeaderboardEntry = {
      userId,
      username: user.username,
      coins,
      streak,
      lastUpdated: new Date().toISOString()
    };

    if (existingEntry) {
      const updatedEntries = entries.map(entry =>
        entry.userId === userId ? updatedEntry : entry
      );
      storage.set(LEADERBOARD_KEY, updatedEntries);
    } else {
      storage.set(LEADERBOARD_KEY, [...entries, updatedEntry]);
    }
  }

  static getUserRank(userId: string): number {
    const entries = this.getLeaderboard();
    const index = entries.findIndex(entry => entry.userId === userId);
    return index === -1 ? -1 : index + 1;
  }
}