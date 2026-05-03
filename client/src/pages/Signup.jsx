import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Activity, Mail, Lock, User, Ruler, Weight, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', age: '', gender: 'Male', height: '', weight: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(formData);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative z-10"
      >
        <div className="max-w-xl w-full mx-auto glass-panel p-10 rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
          
          <div className="flex items-center mb-8 relative z-10">
            <div className="w-10 h-10 rounded-xl premium-gradient-bg flex items-center justify-center shadow-lg shadow-blue-500/30 mr-3">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">LifeGuard AI</span>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Create Account</h2>
            <p className="text-gray-500 mb-8 font-medium">Join the future of precision healthcare today.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input type="text" name="name" required className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white/50 backdrop-blur-sm text-gray-900 font-medium" placeholder="John Doe" onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input type="email" name="email" required className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white/50 backdrop-blur-sm text-gray-900 font-medium" placeholder="name@example.com" onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input type="password" name="password" required className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white/50 backdrop-blur-sm text-gray-900 font-medium" placeholder="••••••••" onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Age</label>
                  <input type="number" name="age" required className="block w-full px-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white/50 backdrop-blur-sm text-gray-900 font-medium" placeholder="25" onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Gender</label>
                  <select name="gender" className="block w-full px-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white/50 backdrop-blur-sm text-gray-900 font-medium appearance-none" onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Height (cm)</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Ruler className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" /></div>
                    <input type="number" name="height" required className="block w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white/50 backdrop-blur-sm text-gray-900 font-medium" placeholder="175" onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Weight (kg)</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Weight className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" /></div>
                    <input type="number" name="weight" required className="block w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white/50 backdrop-blur-sm text-gray-900 font-medium" placeholder="70" onChange={handleChange} />
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isLoading}
                className="w-full mt-6 flex justify-center items-center py-4 px-4 rounded-2xl shadow-lg shadow-blue-500/30 text-md font-bold text-white premium-gradient-bg hover:opacity-90 transition-all disabled:opacity-70 group"
              >
                {isLoading ? (
                  <span className="flex items-center"><Activity className="w-5 h-5 mr-2 animate-spin" /> Creating Account...</span>
                ) : (
                  <>Sign Up <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center bg-gray-50/50 py-4 rounded-xl border border-gray-100">
              <p className="text-sm font-medium text-gray-600">
                Already have an account? <Link to="/login" className="font-extrabold text-blue-600 hover:text-blue-800 ml-1">Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex flex-1 p-6"
      >
        <div className="w-full h-full relative rounded-[3rem] overflow-hidden bg-slate-900 flex flex-col justify-center items-start p-16 shadow-2xl group">
          <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Medical Science" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/90 via-slate-900/70 to-transparent"></div>
          
          <div className="relative z-10 max-w-lg">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="inline-block bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-lg">
                Join the Network
              </div>
              <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">Start your journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">better health.</span></h2>
              <p className="text-xl text-blue-100/90 leading-relaxed font-medium">Our clinical AI analyzes your biometrics to predict potential risks and offer actionable lifestyle interventions.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;