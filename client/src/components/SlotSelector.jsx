import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const SlotSelector = ({ selectedSlot, onSelectSlot, isUrgent, availableSlots }) => {
  // Use passed availableSlots or mock default ones
  const slots = availableSlots || [
    "09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM", "06:00 PM"
  ];

  // If urgent, suggest earliest slots
  return (
    <div className="mt-6">
      <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-3 flex items-center">
        <Clock className="w-4 h-4 mr-2" /> Select Time Slot
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {slots.map((slot, index) => {
          const isSelected = selectedSlot === slot;
          const isRecommended = isUrgent && index < 2; // Recommend first two slots if urgent

          return (
            <motion.div
              key={slot}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectSlot(slot)}
              className={`relative cursor-pointer p-3 rounded-xl border-2 text-center transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' 
                  : isRecommended 
                    ? 'border-orange-200 bg-orange-50 text-orange-800 hover:border-orange-300'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
              }`}
            >
              <span className="text-sm font-extrabold">{slot}</span>
              {isRecommended && !isSelected && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md animate-pulse">
                  FAST
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SlotSelector;
