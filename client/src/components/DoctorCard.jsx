import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Briefcase, Award, ArrowRight } from 'lucide-react';

const DoctorCard = ({ doctor, onSelect, onViewProfile }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all p-5 flex flex-col md:flex-row gap-5"
    >
      <div className="relative shrink-0">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-24 h-24 rounded-2xl object-cover border border-gray-100 shadow-sm"
        />
        {doctor.availableToday && (
          <div className="absolute -bottom-2 -right-2 bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-1 rounded-md border border-emerald-200 flex items-center">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
             Available
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-lg font-extrabold text-slate-900">{doctor.name}</h4>
          <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
            <Star className="w-3.5 h-3.5 text-amber-500 mr-1 fill-amber-500" />
            <span className="text-xs font-bold text-amber-700">{doctor.rating}</span>
            <span className="text-[10px] text-amber-600/70 ml-1">({doctor.totalReviews})</span>
          </div>
        </div>

        <p className="text-sm font-bold text-blue-600 mb-3">{doctor.specialization} <span className="text-slate-300 mx-1">|</span> <span className="text-slate-600 font-medium">{doctor.qualification}</span></p>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
          <div className="flex items-center text-xs text-slate-500 font-medium">
            <Briefcase className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> {doctor.experience} Exp.
          </div>
          <div className="flex items-center text-xs text-slate-500 font-medium">
            <Award className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> ₹{doctor.fee} Consultation
          </div>
          <div className="flex items-center text-xs text-slate-500 font-medium col-span-2">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> {doctor.hospital}
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            type="button"
            onClick={() => onViewProfile(doctor)}
            className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2 rounded-xl text-sm border border-slate-200 transition-colors"
          >
            View Profile
          </button>
          <button 
            type="button"
            onClick={() => onSelect(doctor)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-sm shadow-md shadow-blue-500/20 transition-colors flex items-center justify-center"
          >
            Select Doctor <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
