import { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const EmergencyButton = ({ onTriggerEmergency }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdTimeout = useRef(null);
  const intervalRef = useRef(null);
  const controls = useAnimation();

  const handlePointerDown = () => {
    setIsHolding(true);
    setProgress(0);
    
    controls.start({
      scale: 0.95,
      transition: { duration: 0.2 }
    });

    const startTime = Date.now();
    const duration = 3000;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);
      
      if (percent >= 100) {
        clearInterval(intervalRef.current);
      }
    }, 50);

    holdTimeout.current = setTimeout(() => {
      clearInterval(intervalRef.current);
      setProgress(100);
      setIsHolding(false);
      onTriggerEmergency();
      controls.start({ scale: 1 });
    }, duration);
  };

  const handlePointerUpOrLeave = () => {
    if (isHolding) {
      clearTimeout(holdTimeout.current);
      clearInterval(intervalRef.current);
      setIsHolding(false);
      setProgress(0);
      controls.start({ scale: 1 });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="144"
            cy="144"
            r="136"
            className="text-gray-100 stroke-current"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="144"
            cy="144"
            r="136"
            className="text-red-500 stroke-current transition-all duration-75 ease-linear"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 136}
            strokeDashoffset={2 * Math.PI * 136 * (1 - progress / 100)}
          />
        </svg>

        {/* Button */}
        <motion.button
          animate={controls}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUpOrLeave}
          onPointerLeave={handlePointerUpOrLeave}
          onContextMenu={(e) => e.preventDefault()}
          className="relative z-10 w-60 h-60 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_50px_rgba(239,68,68,0.6)] flex flex-col items-center justify-center text-white cursor-pointer select-none"
        >
          <span className="text-4xl font-black uppercase tracking-widest mb-2 drop-shadow-md">SOS</span>
          <span className="text-sm font-bold opacity-90 px-4 text-center">Hold for Emergency Call</span>
        </motion.button>
      </div>
      <p className="mt-10 text-sm font-medium text-red-600 bg-red-50 px-6 py-3 rounded-xl border border-red-200 shadow-sm flex items-center">
        <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
        Use this only during real emergency situations.
      </p>
    </div>
  );
};

export default EmergencyButton;
