import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FoodItem } from '../types/food';

interface TimerProps {
  food: FoodItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string) => void;
  onReset: (id: string) => void;
}

export const Timer: React.FC<TimerProps> = ({ food, onRemove, onUpdate, onReset }) => {
  useEffect(() => {
    let interval: number;
    if (food.status === 'cooking' && food.remainingTime > 0) {
      interval = setInterval(() => {
        onUpdate(food.id);
      }, 1000);
    } else if (food.status === 'done') {
      // 计时结束时震动
      if (navigator.vibrate) {
        navigator.vibrate([100, 100, 100]);
      }
    }
    return () => clearInterval(interval);
  }, [food.status, food.remainingTime]);

  const progressVariants = {
    initial: { width: '0%' },
    animate: {
      width: '100%',
      transition: {
        duration: food.defaultTime,
        ease: "linear",
        type: "tween"
      }
    },
    done: {
      width: '100%',
      transition: {
        duration: 0
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-md p-4 relative overflow-hidden border border-red-100 cursor-pointer"
    >
      <motion.div
        key={`${food.id}-${food.status}`}
        variants={progressVariants}
        initial="initial"
        animate={food.status === 'cooking' ? 'animate' : 'done'}
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.2))',
        }}
        className={`absolute left-0 top-0 h-full z-0 ${
          food.status === 'done' ? 'bg-red-100' : ''
        }`}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-red-800">{food.name}</h3>
          <div className="text-2xl font-mono text-red-600">
            {food.remainingTime}s
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onReset(food.id)}
            className="text-red-400 hover:text-red-600 transition-colors h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-50"
          >
            ↺
          </button>
          <button
            onClick={() => onRemove(food.id)}
            className="text-red-400 hover:text-red-600 transition-colors h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-50"
          >
            ×
          </button>
        </div>
      </div>
    </motion.div>
  );
};
