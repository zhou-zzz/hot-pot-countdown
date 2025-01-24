export interface FoodItem {
  id: string;
  name: string;
  defaultTime: number; // 默认烹饪时间（秒）
  remainingTime: number; // 剩余时间（秒）
  status: 'idle' | 'cooking' | 'done'; // 状态：未开始、烹饪中、完成
}

export const defaultFoodList: FoodItem[] = [
  // 超快速 (1-5秒)
  { id: '1', name: '生菜', defaultTime: 3, status: 'idle', remainingTime: 3 },
  { id: '2', name: '豆芽', defaultTime: 5, status: 'idle', remainingTime: 5 },
  { id: '3', name: '金针菇', defaultTime: 5, status: 'idle', remainingTime: 5 },
  
  // 快速 (6-10秒)
  { id: '4', name: '毛肚', defaultTime: 7, status: 'idle', remainingTime: 7 },
  { id: '5', name: '肥牛', defaultTime: 8, status: 'idle', remainingTime: 8 },
  { id: '6', name: '虾仁', defaultTime: 10, status: 'idle', remainingTime: 10 },
  
  // 中速 (11-20秒)
  { id: '7', name: '虾滑', defaultTime: 15, status: 'idle', remainingTime: 15 },
  { id: '8', name: '鸭肠', defaultTime: 15, status: 'idle', remainingTime: 15 },
  { id: '9', name: '午餐肉', defaultTime: 12, status: 'idle', remainingTime: 12 },
  { id: '10', name: '年糕', defaultTime: 20, status: 'idle', remainingTime: 20 },
  
  // 慢速 (21-40秒)
  { id: '11', name: '羊肉', defaultTime: 25, status: 'idle', remainingTime: 25 },
  { id: '12', name: '牛肉', defaultTime: 30, status: 'idle', remainingTime: 30 },
  { id: '13', name: '猪肉片', defaultTime: 35, status: 'idle', remainingTime: 35 },
  
  // 超慢速 (40秒以上)
  { id: '14', name: '藕片', defaultTime: 120, status: 'idle', remainingTime: 120 },
  { id: '15', name: '土豆', defaultTime: 180, status: 'idle', remainingTime: 180 },
  { id: '16', name: '萝卜', defaultTime: 240, status: 'idle', remainingTime: 240 },
];
