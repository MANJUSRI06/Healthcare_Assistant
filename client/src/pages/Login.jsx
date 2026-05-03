import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Activity, Mail, Lock, ShieldCheck, LockKeyhole, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans overflow-hidden">
      {/* Left Form Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative z-10"
      >
        <div className="max-w-md w-full mx-auto glass-panel p-10 rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
          
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl"></div>

          <div className="flex items-center mb-10 relative z-10">
            <div className="w-12 h-12 rounded-xl premium-gradient-bg flex items-center justify-center shadow-lg shadow-blue-500/30 mr-4">
              <Activity className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-extrabold text-gray-900 tracking-tight">LifeGuard AI</span>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 mb-8 font-medium">Please enter your credentials to access the portal.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input 
                    type="email" required 
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white/50 backdrop-blur-sm text-gray-900 font-medium" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest">Password</label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-bold transition-colors">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input 
                    type="password" required 
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white/50 backdrop-blur-sm text-gray-900 font-medium" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isLoading}
                className="w-full flex justify-center items-center py-4 px-4 rounded-2xl shadow-lg shadow-blue-500/30 text-md font-bold text-white premium-gradient-bg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all disabled:opacity-70 mt-4 group"
              >
                {isLoading ? (
                  <span className="flex items-center"><Activity className="w-5 h-5 mr-2 animate-spin" /> Authenticating...</span>
                ) : (
                  <>Login <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center bg-gray-50/50 py-4 rounded-xl border border-gray-100">
              <p className="text-sm font-medium text-gray-600">
                Don't have an account? <Link to="/signup" className="font-extrabold text-blue-600 hover:text-blue-800 ml-1">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Image Section */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex flex-1 p-6"
      >
        <div className="w-full h-full relative rounded-[3rem] overflow-hidden bg-slate-900 flex flex-col items-center justify-center p-12 shadow-2xl group">
          
          <img src="https://images.unsplash.com/photo-1576091160550-2173ff9e9e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Medical Technology" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-slate-900/60 to-transparent"></div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="glass-card p-10 rounded-[2rem] shadow-2xl w-full max-w-lg mb-8 z-10 relative border-white/20"
          >
            <div className="bg-emerald-500/20 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/30">
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-4xl font-extrabold text-white mb-4 leading-tight">Advancing Care Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Precision.</span></h3>
            <p className="text-blue-100 leading-relaxed text-lg">
              Access your health dashboard, clinical assessments, and real-time biological data in one secure, unified environment.
            </p>
          </motion.div>

          <div className="absolute bottom-10 left-10 right-10 flex justify-between px-10 text-xs font-bold text-white/60 uppercase tracking-widest z-10 backdrop-blur-md bg-white/5 py-4 rounded-2xl border border-white/10">
            <span className="flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-emerald-400" /> HIPAA Compliant</span>
            <span className="flex items-center"><LockKeyhole className="w-5 h-5 mr-2 text-blue-400" /> AES-256 Encryption</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;