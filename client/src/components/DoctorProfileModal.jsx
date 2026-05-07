import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, Briefcase, Award, Languages, ThumbsUp, Calendar as CalIcon } from 'lucide-react';

const DoctorProfileModal = ({ doctor, isOpen, onClose, onBook }) => {
  if (!isOpen || !doctor) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header/Close */}
          <div className="absolute top-4 right-4 z-10">
            <button onClick={onClose} className="p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-500 hover:text-slate-900 shadow-sm border border-slate-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Top Profile Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 border-b border-blue-100 flex flex-col sm:flex-row gap-6 items-start">
            <img src={doctor.image} alt={doctor.name} className="w-28 h-28 rounded-2xl shadow-lg border-4 border-white object-cover shrink-0" />
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">{doctor.name}</h2>
              <p className="text-blue-600 font-extrabold text-sm mb-3">{doctor.specialization} <span className="text-slate-400 font-normal mx-1">|</span> <span className="text-slate-600">{doctor.qualification}</span></p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white border border-blue-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center shadow-sm">
                  <Briefcase className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> {doctor.experience}
                </span>
                <span className="bg-white border border-blue-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center shadow-sm">
                  <Award className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> ₹{doctor.fee}
                </span>
                <span className="bg-white border border-blue-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center shadow-sm">
                  <Languages className="w-3.5 h-3.5 mr-1.5 text-indigo-500" /> {doctor.languages.join(', ')}
                </span>
              </div>

              <p className="text-sm text-slate-600 font-medium leading-relaxed">{doctor.about}</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center"><ThumbsUp className="w-3 h-3 mr-1.5" /> Best For</h4>
                 <p className="text-sm font-bold text-slate-800">{doctor.bestFor}</p>
               </div>
               <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center"><MapPin className="w-3 h-3 mr-1.5" /> Available At</h4>
                 <p className="text-sm font-bold text-slate-800">{doctor.hospital}</p>
               </div>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-extrabold text-slate-900">Patient Reviews</h3>
                <div className="flex items-center bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                  <Star className="w-4 h-4 text-amber-500 mr-1.5 fill-amber-500" />
                  <span className="font-bold text-amber-700">{doctor.rating}</span>
                  <span className="text-xs text-amber-600 ml-1">({doctor.totalReviews})</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {doctor.reviews.map((review, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-extrabold text-slate-800 text-sm">{review.patientName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 flex items-center"><CalIcon className="w-3 h-3 mr-1" /> {review.date} • {review.visitReason}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 font-medium italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="p-4 sm:p-6 border-t border-slate-100 bg-white">
            <button 
              onClick={() => onBook(doctor)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
            >
              Book Appointment with {doctor.name.split(' ')[0]}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DoctorProfileModal;
