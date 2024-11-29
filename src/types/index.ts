export interface User {
  id: string;
  email: string;
  username: string;
  coins: number;
  redeemedRewards: string[];
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  streak: number;
  lastCompletedAt?: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  image: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, username: string) => void;
  logout: () => void;
}

export interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'userId'>) => void;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
}

export interface RewardState {
  rewards: Reward[];
  redeemReward: (rewardId: string) => void;
  canAffordReward: (rewardId: string) => boolean;
  hasRedeemed: (rewardId: string) => boolean;
}