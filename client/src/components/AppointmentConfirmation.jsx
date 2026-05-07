import { motion } from 'framer-motion';
import { CheckCircle2, User, Building2, Calendar, Clock, Stethoscope, Hash, AlertTriangle, MapPin, Download, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppointmentConfirmation = ({ appointment, onBookAnother }) => {
  const handleDirections = () => {
    if (appointment.hospitalAddress) {
       // Mock coordinates for demo directions
       window.open(`https://www.google.com/maps/dir/?api=1&destination=${appointment.hospitalAddress}`, '_blank');
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 max-w-2xl mx-auto mt-8 printable-area"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Booking Confirmed</h2>
        <p className="text-blue-100 font-medium">Your digital hospital token is ready.</p>
      </div>

      <div className="p-8">
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase flex items-center shadow-md">
            <Hash className="w-3 h-3 mr-1" /> {appointment.tokenNumber}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Patient Name</p>
                <p className="font-extrabold text-gray-900">{appointment.patientName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Department & Doctor</p>
                <p className="font-extrabold text-gray-900 leading-tight">
                  {appointment.selectedDepartment}<br/>
                  <span className="text-blue-600 font-bold text-sm">{appointment.doctorName}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:col-span-2 bg-white p-3 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Hospital</p>
                <p className="font-extrabold text-gray-900">{appointment.hospital}</p>
                <p className="text-xs font-medium text-slate-500 flex items-center mt-0.5"><MapPin className="w-3 h-3 mr-1" /> {appointment.hospitalAddress}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Date</p>
                <p className="font-extrabold text-gray-900">{new Date(appointment.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Time Slot</p>
                <p className="font-extrabold text-gray-900">{appointment.time}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
             <span className="text-xs font-bold text-slate-500 uppercase">Consultation Fee</span>
             <span className="text-xl font-black text-slate-900">₹{appointment.doctorFee || 'N/A'}</span>
          </div>
        </div>

        {appointment.emergencyDetected && (
           <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start">
             <AlertTriangle className="w-6 h-6 mr-3 shrink-0" />
             <p className="text-sm font-bold leading-relaxed">This booking involves urgent symptoms. Please arrive immediately and proceed straight to the emergency desk.</p>
           </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-8 no-print">
          <button onClick={handleDownload} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-colors text-center border border-slate-200 flex items-center justify-center">
            <Download className="w-4 h-4 mr-2" /> Download Slip
          </button>
          <button onClick={handleDirections} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-colors text-center border border-slate-200 flex items-center justify-center">
            <Navigation className="w-4 h-4 mr-2" /> Get Directions
          </button>
          <button onClick={onBookAnother} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center">
            Done
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentConfirmation;
