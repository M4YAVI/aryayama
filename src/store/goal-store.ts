import { create } from 'zustand';

interface GoalItem {
  id: number;
  goalId: number;
  name: string;
  year: number;
  completed: number;
}

interface GoalState {
  currentGoalItems: GoalItem[];
  addGoalItem: (item: Omit<GoalItem, 'id' | 'goalId'>) => void;
  removeGoalItem: (id: number) => void;
  updateGoalItem: (id: number, updates: Partial<GoalItem>) => void;
  // ... other state management if needed
}

export const useGoals = create<GoalState>((set) => ({
  currentGoalItems: [],
  addGoalItem: (item) =>
    set((state) => ({
      currentGoalItems: [
        ...state.currentGoalItems,
        { ...item, id: Date.now(), goalId: 1 },
      ], // Temporary ID
    })),
  removeGoalItem: (id) =>
    set((state) => ({
      currentGoalItems: state.currentGoalItems.filter((item) => item.id !== id),
    })),
  updateGoalItem: (id, updates) =>
    set((state) => ({
      currentGoalItems: state.currentGoalItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),
}));
