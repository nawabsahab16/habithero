import { storage } from './storage';
import { User } from '../types';
import { generateId } from '../utils/generateId';

const AUTH_KEY = 'habitHero_auth';

export class AuthService {
  static getCurrentUser(): User | null {
    const data = storage.get(AUTH_KEY);
    return data?.user || null;
  }

  static async login(email: string, password: string): Promise<User> {
  
    const user: User = {
      id: generateId(),
      email,
      username: email.split('@')[0],
      coins: 0,
      redeemedRewards: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    storage.set(AUTH_KEY, { user });
    return user;
  }

  static async register(email: string, password: string, username: string): Promise<User> {
  
    const user: User = {
      id: generateId(),
      email,
      username,
      coins: 0,
      redeemedRewards: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    storage.set(AUTH_KEY, { user });
    return user;
  }

  static async logout(): Promise<void> {
    storage.remove(AUTH_KEY);
  }

  static async updateUser(userData: Partial<User>): Promise<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    const updatedUser = {
      ...currentUser,
      ...userData,
      lastUpdated: new Date().toISOString()
    };

    storage.set(AUTH_KEY, { user: updatedUser });
    return updatedUser;
  }
}