import { motion } from 'framer-motion';
import { MapPin, Navigation as NavIcon, HeartPulse, Clock, AlertCircle } from 'lucide-react';

const NearbyHospitalCard = ({ hospital, onSelectHospital }) => {
  const isEmergency = hospital.emergencyAvailable;

  const handleDirections = (e) => {
    e.stopPropagation();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`, '_blank');
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-2xl p-5 border shadow-sm relative overflow-hidden transition-all ${isEmergency ? 'border-red-100 hover:border-red-300' : 'border-slate-100 hover:border-blue-300'}`}
    >
      {isEmergency && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase flex items-center shadow-sm">
          <HeartPulse className="w-3 h-3 mr-1 animate-pulse" /> Emergency Care
        </div>
      )}
      
      <div className="flex justify-between items-start mb-3 mt-1">
        <div>
          <h4 className="font-extrabold text-slate-900 text-lg">{hospital.name}</h4>
          <p className="text-xs font-bold text-slate-500">{hospital.type}</p>
        </div>
        <div className="bg-blue-50 px-2 py-1 rounded border border-blue-100 text-blue-700 text-xs font-extrabold">
          {hospital.distance} km
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-start text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5 mr-2 shrink-0 text-slate-400 mt-0.5" />
          <span className="font-medium line-clamp-1">{hospital.address}</span>
        </div>
        <div className="flex items-center text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5 mr-2 shrink-0 text-slate-400" />
          <span className="font-medium">{hospital.openStatus}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {hospital.departments.slice(0,3).map((dept, idx) => (
          <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
            {dept}
          </span>
        ))}
        {hospital.departments.length > 3 && <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">+{hospital.departments.length - 3} more</span>}
      </div>

      <div className="flex gap-2">
        <button 
          type="button"
          onClick={() => onSelectHospital(hospital)}
          className={`flex-1 font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center ${isEmergency ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'}`}
        >
          Select Hospital
        </button>
        <button 
          type="button"
          onClick={handleDirections}
          className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold p-2.5 rounded-xl border border-slate-200 transition-colors flex items-center justify-center"
          title="Get Directions"
        >
          <NavIcon className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </motion.div>
  );
};

export default NearbyHospitalCard;
