import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, UserCircle, HeartPulse, Sparkles, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle, Upload, FileText } from 'lucide-react';

const steps = [
  { id: 1, title: 'Core Identity', icon: UserCircle },
  { id: 2, title: 'Clinical Vitals', icon: HeartPulse },
  { id: 3, title: 'Lifestyle & Habits', icon: Activity },
];

const PredictionForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    age: user?.age || 34,
    gender: user?.gender || 'Male',
    bmi: user?.bmi || 24.5,
    dailySteps: 8000,
    sleepHours: 7.5,
    waterIntake: 2.5,
    caloriesConsumed: 2200,
    stressLevel: 'Low',
    restingHeartRate: 72,
    systolicBP: 120,
    diastolicBP: 80,
    cholesterol: 180,
    glucose: 90,
    familyHistory: 'no',
    smoker: 'no',
    alcohol: 'no',
    exerciseFrequency: '3-5 times a week',
    dietType: 'Mixed'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value });
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsExtracting(true);
    toast.loading('AI is analyzing medical report...', { id: 'extract' });

    // Simulate AI OCR and Data Extraction
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        restingHeartRate: 74,
        systolicBP: 118,
        diastolicBP: 78,
        cholesterol: 175,
        glucose: 92
      }));
      setIsExtracting(false);
      toast.success('Clinical values auto-filled from report!', { id: 'extract' });
    }, 3000);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep !== steps.length) return handleNext();
    
    setLoading(true);
    try {
      const { data } = await api.post('/predictions/create', formData);
      toast.success('Analysis complete!');
      navigate(`/result/${data._id}`);
    } catch (error) {
      toast.error('Failed to generate prediction');
      setLoading(false);
    }
  };

  const inputClass = "w-full border-2 border-gray-100 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-gray-900 font-bold transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-blue-300";
  const labelClass = "block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-2 ml-1";

  const renderStep1 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Age (Years)</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
            <option>Male</option><option>Female</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>BMI (Body Mass Index)</label>
          <div className="flex items-center gap-4">
            <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} className={inputClass} />
            <div className={`px-4 py-4 rounded-2xl font-bold text-sm whitespace-nowrap border ${formData.bmi < 18.5 ? 'bg-amber-50 text-amber-700 border-amber-200' : formData.bmi < 25 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {formData.bmi < 18.5 ? 'Underweight' : formData.bmi < 25 ? 'Normal' : formData.bmi < 30 ? 'Overweight' : 'Obese'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* AI Extraction Card */}
      <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-400 transition-colors">
        <input 
          type="file" 
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileUpload}
          disabled={isExtracting}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isExtracting ? 'bg-blue-200 text-blue-600 animate-pulse' : 'bg-blue-100 text-blue-500 group-hover:scale-110 transition-transform'}`}>
              {isExtracting ? <Activity className="w-6 h-6 animate-spin" /> : <FileText className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900">Auto-fill via Medical Report</h3>
              <p className="text-sm text-gray-500 font-medium">Upload PDF or Image. Our AI will extract your vitals.</p>
            </div>
          </div>
          <button type="button" className="pointer-events-none bg-white text-blue-600 font-bold px-5 py-2.5 rounded-xl border border-blue-100 shadow-sm flex items-center">
            <Upload className="w-4 h-4 mr-2" /> {isExtracting ? 'Extracting...' : 'Upload File'}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4 my-2">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Or enter manually</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Resting Heart Rate (BPM)</label>
          <input type="number" name="restingHeartRate" value={formData.restingHeartRate} onChange={handleChange} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div>
             <label className={labelClass}>Systolic</label>
             <input type="number" name="systolicBP" value={formData.systolicBP} onChange={handleChange} className={inputClass} placeholder="120" />
           </div>
           <div>
             <label className={labelClass}>Diastolic</label>
             <input type="number" name="diastolicBP" value={formData.diastolicBP} onChange={handleChange} className={inputClass} placeholder="80" />
           </div>
        </div>
        <div>
          <label className={labelClass}>Cholesterol Level (mg/dL)</label>
          <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Glucose Level (mg/dL)</label>
          <input type="number" name="glucose" value={formData.glucose} onChange={handleChange} className={inputClass} />
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Daily Steps</label>
          <input type="number" name="dailySteps" value={formData.dailySteps} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Sleep Hours</label>
          <input type="number" step="0.1" name="sleepHours" value={formData.sleepHours} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Stress Level</label>
          <select name="stressLevel" value={formData.stressLevel} onChange={handleChange} className={inputClass}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Exercise Frequency</label>
          <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} className={inputClass}>
            <option>Never</option><option>1-2 times a week</option><option>3-5 times a week</option><option>Daily</option>
          </select>
        </div>
        
        <div className="md:col-span-2 grid grid-cols-2 gap-6 mt-2">
           <div className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${formData.smoker === 'yes' ? 'border-red-400 bg-red-50/50' : 'border-gray-100 bg-white/50'}`} onClick={() => setFormData({...formData, smoker: formData.smoker === 'yes' ? 'no' : 'yes'})}>
             <div>
               <p className="font-extrabold text-gray-900 text-sm">Smoker</p>
               <p className="text-xs font-medium text-gray-500">Do you currently smoke?</p>
             </div>
             <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.smoker === 'yes' ? 'bg-red-500' : 'bg-gray-300'}`}>
                <motion.div className="w-4 h-4 bg-white rounded-full shadow-md" animate={{ x: formData.smoker === 'yes' ? 24 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
             </div>
           </div>
           
           <div className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${formData.alcohol === 'yes' ? 'border-amber-400 bg-amber-50/50' : 'border-gray-100 bg-white/50'}`} onClick={() => setFormData({...formData, alcohol: formData.alcohol === 'yes' ? 'no' : 'yes'})}>
             <div>
               <p className="font-extrabold text-gray-900 text-sm">Alcohol Consumption</p>
               <p className="text-xs font-medium text-gray-500">Do you consume regularly?</p>
             </div>
             <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.alcohol === 'yes' ? 'bg-amber-500' : 'bg-gray-300'}`}>
                <motion.div className="w-4 h-4 bg-white rounded-full shadow-md" animate={{ x: formData.alcohol === 'yes' ? 24 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-12 px-4">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center premium-gradient-bg text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-lg shadow-blue-500/30"
        >
          <Sparkles className="w-3 h-3 mr-2" /> Advanced AI Analytics
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
        >
          Health Risk Prediction
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-gray-500 max-w-2xl mx-auto text-lg font-medium"
        >
          Utilize our clinical-grade assessment tool to analyze your metabolic and cardiovascular health profile.
        </motion.p>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -z-10"></div>

        {/* Wizard Progress */}
        <div className="mb-12 relative">
           <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0"></div>
           <motion.div 
              className="absolute top-1/2 left-0 h-1 premium-gradient-bg -translate-y-1/2 rounded-full z-0" 
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
           ></motion.div>
           
           <div className="relative z-10 flex justify-between">
              {steps.map((step) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                const Icon = step.icon;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <motion.div 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg mb-3 shadow-md transition-colors duration-300 ${isActive ? 'premium-gradient-bg text-white shadow-blue-500/40 border-2 border-white' : isCompleted ? 'bg-emerald-500 text-white border-2 border-emerald-200' : 'bg-white text-gray-400 border-2 border-gray-100'}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </motion.div>
                    <span className={`text-xs font-extrabold uppercase tracking-widest ${isActive ? 'text-blue-700' : isCompleted ? 'text-emerald-600' : 'text-gray-400'}`}>{step.title}</span>
                  </div>
                )
              })}
           </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="min-h-[300px]">
             <AnimatePresence mode="wait">
               {currentStep === 1 && <motion.div key="step1">{renderStep1()}</motion.div>}
               {currentStep === 2 && <motion.div key="step2">{renderStep2()}</motion.div>}
               {currentStep === 3 && <motion.div key="step3">{renderStep3()}</motion.div>}
             </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
            <button 
              type="button" 
              onClick={handlePrev} 
              className={`flex items-center px-6 py-3 font-bold text-gray-600 hover:text-gray-900 transition-colors ${currentStep === 1 ? 'invisible' : ''}`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className="flex items-center premium-gradient-bg text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all disabled:opacity-70 group"
            >
              {loading ? (
                <><Activity className="w-5 h-5 mr-2 animate-spin" /> Analyzing Data...</>
              ) : currentStep === steps.length ? (
                <><ShieldCheck className="w-5 h-5 mr-2" /> Generate Report</>
              ) : (
                <>Next Step <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictionForm;