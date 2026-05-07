import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { analyzeSymptoms, bookAppointment } from '../api/appointmentApi';
import { getDoctorsByHospitalAndDept } from '../api/doctorApi';
import AISuggestionCard from './AISuggestionCard';
import SlotSelector from './SlotSelector';
import HospitalSelector from './HospitalSelector';
import DoctorCard from './DoctorCard';
import DoctorProfileModal from './DoctorProfileModal';
import toast from 'react-hot-toast';
import { User, Phone, Activity, ActivitySquare, CheckCircle, ArrowRight, RefreshCw, FileText, ShieldCheck, QrCode } from 'lucide-react';

const AppointmentForm = ({ onSuccess }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  
  // State
  const [suggestion, setSuggestion] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [profileModalDoc, setProfileModalDoc] = useState(null);
  
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    age: user?.age || '',
    gender: user?.gender || 'Male',
    phone: user?.phone || '',
    symptoms: '',
    appointmentType: 'First Visit',
    date: new Date().toISOString().split('T')[0],
    time: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Analyze Symptoms
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (formData.symptoms.length > 5) {
        setAnalyzing(true);
        try {
          const res = await analyzeSymptoms(formData.symptoms);
          setSuggestion(res);
          // Reset downstream selections if symptoms change heavily
          setSelectedHospital(null);
          setSelectedDoctor(null);
          setFormData(prev => ({...prev, time: ''}));
        } catch (error) {
          console.error("AI Analysis failed", error);
        } finally {
          setAnalyzing(false);
        }
      } else {
        setSuggestion(null);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData.symptoms]);

  // Step 2: Fetch Doctors when Hospital is selected
  useEffect(() => {
    if (selectedHospital && suggestion) {
      const fetchDocs = async () => {
        try {
          const docs = await getDoctorsByHospitalAndDept(selectedHospital.name, suggestion.suggestedDepartment);
          setDoctors(docs);
        } catch (err) {
          console.error(err);
        }
      };
      fetchDocs();
    }
  }, [selectedHospital, suggestion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHospital) return toast.error("Please select a hospital");
    if (!selectedDoctor) return toast.error("Please select a doctor");
    if (!formData.time) return toast.error("Please select a time slot");
    
    setLoading(true);
    toast.loading("Booking your appointment...", { id: "booking" });
    
    try {
      const dataToSubmit = { 
        ...formData, 
        userId: user?._id,
        hospital: selectedHospital.name,
        hospitalId: selectedHospital.hospitalId,
        hospitalAddress: selectedHospital.address,
        hospitalDistance: selectedHospital.distance,
        selectedDepartment: suggestion.suggestedDepartment,
        doctorId: selectedDoctor.doctorId,
        doctorName: selectedDoctor.name,
        doctorSpecialization: selectedDoctor.specialization,
        doctorFee: selectedDoctor.fee
      };
      
      const res = await bookAppointment(dataToSubmit);
      toast.success("Appointment Confirmed!", { id: "booking" });
      onSuccess(res.appointment);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book appointment", { id: "booking" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none font-medium transition-all shadow-inner";
  const labelClass = "block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <>
      <motion.form 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-[2rem] shadow-xl p-6 md:p-10 border border-gray-100"
      >
        <h3 className="text-2xl font-extrabold text-slate-900 mb-8 border-b border-slate-100 pb-4">Patient Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="relative">
            <label className={labelClass}>Patient Name</label>
            <div className="absolute inset-y-0 left-0 pl-4 pt-6 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
            <input required type="text" name="patientName" value={formData.patientName} onChange={handleChange} className={inputClass} placeholder="Full Name" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className={labelClass}>Age</label>
              <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium shadow-inner" placeholder="Age" />
            </div>
            <div className="relative">
              <label className={labelClass}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none font-medium shadow-inner">
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <label className={labelClass}>Phone Number</label>
            <div className="absolute inset-y-0 left-0 pl-4 pt-6 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></div>
            <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="Mobile Number" />
          </div>
          
          <div className="relative">
            <label className={labelClass}>Appointment Type</label>
            <div className="absolute inset-y-0 left-0 pl-4 pt-6 flex items-center pointer-events-none"><FileText className="h-5 w-5 text-gray-400" /></div>
            <select name="appointmentType" value={formData.appointmentType} onChange={handleChange} className={inputClass}>
              <option>First Visit</option><option>Follow-up</option>
            </select>
          </div>
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">Symptom Analysis</h3>

        <div className="mb-6 relative">
          <label className={labelClass}>Describe Your Symptoms</label>
          <div className="absolute top-9 left-4 pointer-events-none">
            {analyzing ? <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" /> : <Activity className="h-5 w-5 text-gray-400" />}
          </div>
          <textarea required name="symptoms" value={formData.symptoms} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none font-medium shadow-inner min-h-[100px]" placeholder="E.g., Severe chest pain, sweating, and shortness of breath since morning..."></textarea>
        </div>

        <AISuggestionCard suggestion={suggestion} />

        <AnimatePresence>
          {suggestion && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
              <HospitalSelector 
                suggestedDepartment={suggestion.suggestedDepartment} 
                priorityLevel={suggestion.priorityLevel}
                onSelect={(hospital) => {
                   setSelectedHospital(hospital);
                   setSelectedDoctor(null);
                }} 
              />
            </motion.div>
          )}

          {selectedHospital && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden mt-8">
               <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center">
                 <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" /> Selected Hospital: {selectedHospital.name}
               </h3>
               
               <div className="mb-6">
                 <label className={labelClass}>Select a Specialist ({suggestion.suggestedDepartment})</label>
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-2">
                    {doctors.map(doc => (
                       <div key={doc.doctorId} className={selectedDoctor?.doctorId === doc.doctorId ? 'ring-2 ring-blue-500 rounded-2xl shadow-lg scale-[1.01] transition-all' : ''}>
                          <DoctorCard 
                            doctor={doc} 
                            onSelect={(d) => setSelectedDoctor(d)}
                            onViewProfile={(d) => setProfileModalDoc(d)}
                          />
                       </div>
                    ))}
                    {doctors.length === 0 && <p className="text-sm font-bold text-slate-500">No doctors available for this department. Try another hospital.</p>}
                 </div>
               </div>
            </motion.div>
          )}

          {selectedDoctor && (
             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden mt-8 border-t border-slate-100 pt-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className={labelClass}>Appointment Date</label>
                    <input required type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className={inputClass} />
                  </div>
                  <div className="flex-[2]">
                    <SlotSelector 
                      selectedSlot={formData.time} 
                      onSelectSlot={(slot) => setFormData({...formData, time: slot})} 
                      isUrgent={suggestion?.emergencyDetected || suggestion?.priorityLevel === "Urgent Care Recommended"} 
                      availableSlots={selectedDoctor.availableSlots}
                    />
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 flex flex-col md:flex-row gap-8 items-center">
                    
                    {/* Payment Info */}
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                           <ShieldCheck className="w-6 h-6" />
                         </div>
                         <div>
                           <h4 className="text-lg font-extrabold text-slate-900">Secure Payment</h4>
                           <p className="text-sm font-medium text-slate-500">Scan QR to confirm booking</p>
                         </div>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-sm font-bold text-slate-500">Consultation Fee</span>
                           <span className="text-sm font-black text-slate-900">₹{selectedDoctor.fee}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-sm font-bold text-slate-500">Platform Fee</span>
                           <span className="text-sm font-black text-emerald-600">Free</span>
                        </div>
                        <div className="h-px bg-slate-100 my-3"></div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Total Pay</span>
                           <span className="text-2xl font-black text-blue-600">₹{selectedDoctor.fee}</span>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group disabled:opacity-70 disabled:hover:translate-y-0"
                      >
                        {loading ? 'Processing...' : 'I have paid, Book Appointment'} 
                        {!loading && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                      </button>
                    </div>

                    {/* QR Code Section */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex flex-col items-center justify-center text-center w-full md:w-[240px] shrink-0">
                       <div className="p-3 bg-blue-50 rounded-2xl mb-4 border border-blue-100 relative">
                         {/* Dynamic QR Code based on Doctor Fee using User's UPI ID */}
                         <img 
                           src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=manjusri6526@okhdfcbank&pn=Healthcare%20Assistant&am=${selectedDoctor.fee}&cu=INR`} 
                           alt="GPay QR" 
                           className="w-32 h-32 rounded-xl" 
                         />
                         {/* Mock GPay Center Icon */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                            <span className="text-blue-600 font-black text-xs text-center leading-none tracking-tighter">G<span className="text-green-500">P</span><span className="text-yellow-500">a</span><span className="text-red-500">y</span></span>
                         </div>
                       </div>
                       <div className="flex items-center gap-2 mb-1">
                         <QrCode className="w-4 h-4 text-slate-400" />
                         <span className="text-xs font-black tracking-widest text-slate-500 uppercase">Scan Any App</span>
                       </div>
                       <p className="text-[10px] font-bold text-slate-400">GPay, PhonePe, Paytm</p>
                    </div>

                  </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      <DoctorProfileModal 
        doctor={profileModalDoc} 
        isOpen={!!profileModalDoc} 
        onClose={() => setProfileModalDoc(null)}
        onBook={(d) => {
           setSelectedDoctor(d);
           setProfileModalDoc(null);
           setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 300);
        }}
      />
    </>
  );
};

export default AppointmentForm;
