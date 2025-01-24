import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from './components/Timer';
import { useTimerStore } from './store/useTimerStore';
import { defaultFoodList } from './types/food';
import { useState } from 'react';
import Logo from './assets/logo.png';
import './styles/scrollbar.css';

function App() {
  const { activeTimers, addTimer, removeTimer, updateTimer, resetTimer } = useTimerStore();
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [customFood, setCustomFood] = useState({ name: '', defaultTime: '' });

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customFood.name && customFood.defaultTime) {
      addTimer({
        name: customFood.name,
        defaultTime: parseInt(customFood.defaultTime),
      });
      setCustomFood({ name: '', defaultTime: '' });
      setShowCustomForm(false);
    }
  };

  const handleVibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      {/* 计时器容器区域 */}
      <div className="flex-1 p-4 pb-22 overflow-y-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-600 flex items-center justify-center gap-2">
          <img src={Logo} alt="" className="h-8" /> 火锅计时器
        </h1>
        <div className="max-w-md mx-auto space-y-4">
          <AnimatePresence>
            {activeTimers.map((timer) => (
              <Timer
                key={timer.id}
                food={timer}
                onRemove={removeTimer}
                onUpdate={updateTimer}
                onReset={resetTimer}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 底部食材选择区域 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-red-100 p-3 rounded-t-3xl z-50">
        <div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPresets(!showPresets)}
            className="w-full mx-auto max-w-md mb-3 py-3 bg-red-500 text-white rounded-xl flex items-center justify-center text-base hover:bg-red-600 transition-colors"
          >
            <span className="mr-1">{showPresets ? '−' : '+'}</span> 
            {showPresets ? '收起食材列表' : '选择预设食材'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showPresets && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-y-auto max-h-[60vh]"
            >
              <div className="max-w-md mx-auto pr-1">
                <div className="mb-6">
                  <h3 className="text-red-600 font-medium mb-3">自定义食材</h3>
                  {showCustomForm ? (
                    <motion.form
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ 
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      onSubmit={handleCustomSubmit}
                      className="max-w-md mx-auto mb-2 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="食材名称"
                          value={customFood.name}
                          onChange={(e) => setCustomFood(prev => ({ ...prev, name: e.target.value }))}
                          className="px-4 py-3 border border-red-200 rounded-xl text-base focus:ring-2 focus:ring-red-200 focus:border-red-300 outline-none"
                        />
                        <input
                          type="number"
                          placeholder="时间(秒)"
                          value={customFood.defaultTime}
                          onChange={(e) => setCustomFood(prev => ({ ...prev, defaultTime: e.target.value }))}
                          className="px-4 py-3 border border-red-200 rounded-xl text-base focus:ring-2 focus:ring-red-200 focus:border-red-300 outline-none"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 bg-red-500 text-white py-3 rounded-xl text-base hover:bg-red-600 transition-colors"
                        >
                          添加
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCustomForm(false)}
                          className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl text-base hover:bg-gray-200 transition-colors"
                        >
                          取消
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowCustomForm(true);
                        handleVibrate();
                      }}
                      className="w-full mb-3 py-3 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-base hover:bg-red-200 transition-colors"
                    >
                      <span className="mr-1">+</span> 添加自定义食材
                    </motion.button>
                  )}
                </div>

                <div>
                  <h3 className="text-red-600 font-medium mb-3 px-1">常用食材</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {defaultFoodList.map((food) => (
                      <motion.button
                        key={food.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          addTimer(food);
                          handleVibrate();
                        }}
                        className="bg-gradient-to-br from-red-50 to-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-red-100 group"
                      >
                        <div className="font-medium text-red-800 group-hover:text-red-600 transition-colors text-base">
                          {food.name}
                        </div>
                        <div className="text-xs text-red-400">
                          ({food.defaultTime}秒)
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
