import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, Activity, HeartPulse } from 'lucide-react';

const AISuggestionCard = ({ suggestion }) => {
  if (!suggestion) return null;

  const { suggestedDepartment, priorityLevel, emergencyDetected, aiSummary } = suggestion;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className={`mt-4 p-5 rounded-2xl border-2 shadow-sm ${emergencyDetected ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${emergencyDetected ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
          {emergencyDetected ? <AlertTriangle className="w-6 h-6 animate-pulse" /> : <Activity className="w-6 h-6" />}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`text-sm font-extrabold uppercase tracking-widest ${emergencyDetected ? 'text-red-700' : 'text-blue-700'}`}>
              AI Pre-Consultation
            </h4>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${emergencyDetected ? 'bg-red-100 border-red-300 text-red-800' : 'bg-emerald-100 border-emerald-300 text-emerald-800'}`}>
              {priorityLevel}
            </span>
          </div>
          
          <p className="text-gray-800 font-medium text-sm mb-3">
            {aiSummary}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center">
              <HeartPulse className="w-5 h-5 text-indigo-500 mr-2" />
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Suggested Dept</p>
                <p className="text-sm font-extrabold text-gray-900">{suggestedDepartment}</p>
              </div>
            </div>
          </div>

          {emergencyDetected && (
            <div className="mt-4 bg-red-100/50 border border-red-200 p-3 rounded-xl flex items-start text-red-800">
              <Info className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
              <p className="text-xs font-bold leading-relaxed">
                This may require emergency medical attention. Please call 108 or visit the nearest emergency department immediately.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AISuggestionCard;
