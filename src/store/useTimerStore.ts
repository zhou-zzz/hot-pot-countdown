import { create } from 'zustand';
import { FoodItem } from '../types/food';

interface TimerStore {
  activeTimers: FoodItem[];
  addTimer: (food: Omit<FoodItem, 'id' | 'status' | 'remainingTime'>) => void;
  removeTimer: (id: string) => void;
  updateTimer: (id: string) => void;
  resetTimer: (id: string) => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  activeTimers: [],
  
  addTimer: (food) => set((state) => ({
    activeTimers: [...state.activeTimers, {
      ...food,
      id: Date.now().toString(),
      status: 'cooking', // 直接设置为 cooking 状态
      remainingTime: food.defaultTime,
    }],
  })),

  removeTimer: (id) => set((state) => ({
    activeTimers: state.activeTimers.filter((timer) => timer.id !== id),
  })),

  updateTimer: (id) => set((state) => ({
    activeTimers: state.activeTimers.map((timer) => {
      if (timer.id === id && timer.status === 'cooking') {
        const newRemainingTime = timer.remainingTime - 1;
        return {
          ...timer,
          remainingTime: newRemainingTime,
          status: newRemainingTime <= 0 ? 'done' : 'cooking',
        };
      }
      return timer;
    }),
  })),

  resetTimer: (id) => set((state) => ({
    activeTimers: state.activeTimers.map((timer) => {
      if (timer.id === id) {
        return {
          ...timer,
          remainingTime: timer.defaultTime,
          status: 'cooking',
        };
      }
      return timer;
    }),
  })),
}));
