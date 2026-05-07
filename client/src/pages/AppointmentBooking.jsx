import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentConfirmation from '../components/AppointmentConfirmation';
import { useTranslation } from 'react-i18next';

const AppointmentBooking = () => {
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-teal-400/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center premium-gradient-bg text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-lg shadow-blue-500/30"
          >
            <Sparkles className="w-3 h-3 mr-2" /> {t("appointment.aiAssist")}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center justify-center"
          >
            <Calendar className="w-10 h-10 mr-4 text-blue-600" /> {t("appointment.title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg font-medium"
          >
            {t("appointment.describe")}
          </motion.p>
        </div>

        {!confirmedAppointment ? (
          <AppointmentForm onSuccess={(appt) => setConfirmedAppointment(appt)} />
        ) : (
          <AppointmentConfirmation 
            appointment={confirmedAppointment} 
            onBookAnother={() => setConfirmedAppointment(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
