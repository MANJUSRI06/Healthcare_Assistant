import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, BrainCircuit, HeartPulse, LineChart, MessageSquare, ChevronRight } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Home = () => {
  return (
    <div className="bg-[#f8fafc] font-sans text-slate-900 overflow-hidden relative">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-teal-400/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none" />

      {/* Navbar directly integrated for transparency/flow */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 w-full z-50 py-6 px-8 md:px-16 flex justify-between items-center bg-transparent"
      >
         <div className="flex items-center">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl premium-gradient-bg shadow-lg shadow-blue-500/30 mr-3">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">LifeGuard AI</span>
         </div>
         <div className="hidden md:flex space-x-8 text-sm font-semibold text-gray-600 glass-panel px-6 py-3">
            <a href="#" className="premium-gradient-text border-b-2 border-blue-500 pb-1">Solutions</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Providers</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
         </div>
         <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Sign In</Link>
            <Link to="/signup" className="text-sm font-bold premium-gradient-bg text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5">Register</Link>
         </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="pt-40 pb-20 px-8 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 min-h-screen">
        <motion.div 
          className="flex-1 z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center bg-white/60 backdrop-blur-md border border-teal-200 text-teal-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 animate-pulse"></span>
            Next-Gen Clinical AI
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Human-Centric <br/>
            <span className="premium-gradient-text">Precision</span> for Your Health.
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
            Experience the future of healthcare. Our clinical AI assistant provides instant risk assessments and continuous monitoring tailored to your unique biological profile.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup" className="group flex items-center justify-center premium-gradient-bg text-white font-bold px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1">
              Check Your Health Risk
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/features" className="glass-panel text-gray-700 font-bold px-8 py-4 rounded-2xl text-center hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 border border-gray-200">
              Explore Features
            </Link>
          </motion.div>
          
          <motion.div variants={fadeIn} className="mt-12 flex items-center space-x-4">
            <div className="flex -space-x-3">
               <img className="w-12 h-12 rounded-full border-2 border-white shadow-md z-30" src="https://randomuser.me/api/portraits/women/32.jpg" alt="" />
               <img className="w-12 h-12 rounded-full border-2 border-white shadow-md z-20" src="https://randomuser.me/api/portraits/men/44.jpg" alt="" />
               <img className="w-12 h-12 rounded-full border-2 border-white shadow-md z-10" src="https://randomuser.me/api/portraits/men/68.jpg" alt="" />
            </div>
            <div className="flex flex-col">
              <div className="flex text-amber-400 text-sm">
                ★★★★★
              </div>
              <p className="text-sm font-medium text-gray-600">Trusted by <span className="font-bold text-gray-900">15,000+</span> providers</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex-1 relative w-full lg:h-[600px] flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Animated Hero Graphic Base */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-teal-50 rounded-[3rem] transform rotate-3 scale-105 -z-10 shadow-2xl"></div>
          
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50 bg-slate-900 group">
             <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Dashboard" className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
             
             {/* Center Pulse Animation */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                  <div className="absolute inset-[-50%] bg-teal-400 rounded-full animate-ping opacity-10" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
                  <div className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    <HeartPulse className="w-10 h-10 text-white animate-pulse-slow" />
                  </div>
                </div>
             </div>
          </div>

          {/* Floating Cards */}
          <motion.div 
            className="absolute -bottom-10 -left-10 glass-card p-6 shadow-2xl max-w-xs z-20 animate-float"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
             <div className="flex items-center text-blue-600 mb-2 font-bold text-sm">
                <LineChart className="w-5 h-5 mr-2" /> Clinical Accuracy
             </div>
             <div className="text-5xl font-extrabold text-gray-900 mb-2">99.8%</div>
             <p className="text-xs text-gray-500 font-medium">Precision based on multi-model AI verifications.</p>
          </motion.div>

          <motion.div 
            className="absolute top-10 -right-8 glass-card p-4 shadow-xl z-20 animate-float"
            style={{ animationDelay: '1.5s' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                 <ShieldCheck className="w-5 h-5 text-emerald-600" />
               </div>
               <div>
                 <div className="text-sm font-bold text-gray-900">HIPAA Compliant</div>
                 <div className="text-xs text-gray-500">Secure & Private</div>
               </div>
             </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto text-center mb-20 px-8">
           <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
           >
             <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Empowering Clinical <span className="premium-gradient-text">Outcomes</span></h2>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">Our multi-layered AI architecture works silently to ensure you are always one step ahead of potential health risks.</p>
           </motion.div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-16">
           <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="md:col-span-2 glass-card p-10 flex flex-col md:flex-row items-center gap-10 hover:-translate-y-2 group"
           >
              <div className="flex-1">
                 <div className="w-14 h-14 premium-gradient-bg text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    <BrainCircuit className="w-7 h-7" />
                 </div>
                 <h3 className="text-3xl font-bold text-gray-900 mb-4">AI Risk Prediction</h3>
                 <p className="text-gray-600 mb-8 leading-relaxed text-lg">Using longitudinal data analysis, LifeGuard predicts potential cardiovascular and metabolic risks before clinical symptoms appear, allowing for early intervention.</p>
                 <ul className="space-y-4">
                    <li className="flex items-center text-md font-semibold text-gray-700 bg-white/50 py-2 px-4 rounded-xl border border-white"><ShieldCheck className="w-5 h-5 text-emerald-500 mr-3" /> Cardiovascular Strain Index</li>
                    <li className="flex items-center text-md font-semibold text-gray-700 bg-white/50 py-2 px-4 rounded-xl border border-white"><ShieldCheck className="w-5 h-5 text-emerald-500 mr-3" /> Metabolic Risk Profiling</li>
                 </ul>
              </div>
              <div className="flex-1 relative w-full h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center border border-teal-100">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <Activity className="w-32 h-32 text-teal-400 group-hover:scale-110 transition-transform duration-700" />
              </div>
           </motion.div>

           <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="premium-gradient-bg rounded-[2rem] p-10 text-white flex flex-col justify-between shadow-2xl shadow-blue-600/20 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4 leading-tight">AI Health Assistant</h3>
                <p className="text-blue-50 mb-8 text-lg">24/7 access to our medically trained AI for immediate health inquiries and personalized guidance.</p>
              </div>
              <button className="w-full bg-white text-blue-600 hover:bg-gray-50 py-4 rounded-2xl font-bold transition-colors shadow-lg relative z-10 flex items-center justify-center group">
                 Start Chatting <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
           </motion.div>
        </div>
      </div>

      {/* Dark Footer Section */}
      <div className="bg-[#0b132b] text-white py-32 px-8 md:px-16 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
         
         <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
            <div className="inline-block bg-blue-900/50 border border-blue-500/30 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              Awareness & Prevention
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-16">Fighting the Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Health Burden</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
               {[
                 { stat: "1 in 3", title: "Hypertension Prevalence", desc: "Nearly 33% of adults globally live with hypertension, many unaware. LifeGuard monitors BP trends continuously.", color: "bg-emerald-400", width: "33%" },
                 { stat: "80%", title: "Preventable Disease", desc: "Up to 80% of premature heart disease and stroke cases are preventable through lifestyle and early medical detection.", color: "bg-blue-400", width: "80%" },
                 { stat: "11yr", title: "Earlier Detection", desc: "Our models identify pre-diabetic markers an average of 11 years before clinical diagnosis in a typical routine check-up.", color: "bg-amber-400", width: "60%" }
               ].map((item, idx) => (
                 <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                    className="bg-white/5 backdrop-blur-lg p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors group"
                 >
                    <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 group-hover:scale-105 transition-transform origin-left">{item.stat}</div>
                    <h4 className="text-xl font-bold mb-4 text-white">{item.title}</h4>
                    <p className="text-gray-400 text-md mb-8 leading-relaxed">{item.desc}</p>
                    <div className="w-full bg-slate-800 rounded-full h-3 mb-3 overflow-hidden shadow-inner">
                       <motion.div 
                        initial={{ width: 0 }} whileInView={{ width: item.width }} transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`${item.color} h-3 rounded-full relative`}
                       >
                         <div className="absolute inset-0 bg-white/20"></div>
                       </motion.div>
                    </div>
                    <div className="text-right text-xs text-gray-500 font-bold uppercase tracking-wider">Metric Scale</div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* CTA Banner */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="max-w-6xl mx-auto premium-gradient-bg rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-[0_0_50px_rgba(59,130,246,0.3)] relative z-10 border border-white/20 overflow-hidden"
         >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
            <div className="flex items-center mb-8 md:mb-0 relative z-10">
               <div className="bg-white/20 p-5 rounded-2xl mr-8 backdrop-blur-md border border-white/30 shadow-xl">
                  <ShieldCheck className="w-10 h-10 text-white" />
               </div>
               <div>
                  <h3 className="text-4xl font-extrabold mb-3 text-white tracking-tight">Ready to take control?</h3>
                  <p className="text-blue-100 text-lg">Start your first AI risk assessment in under 5 minutes.</p>
               </div>
            </div>
            <Link to="/signup" className="relative z-10 bg-white text-blue-600 font-extrabold px-10 py-5 rounded-2xl hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg whitespace-nowrap">
               Get Started Free
            </Link>
         </motion.div>
      </div>
      
      {/* Light Footer */}
      <footer className="bg-white py-16 px-8 md:px-16 border-t border-gray-100">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
            <div className="max-w-sm mb-12 md:mb-0">
               <div className="flex items-center mb-6">
                  <div className="w-8 h-8 rounded-lg premium-gradient-bg flex items-center justify-center mr-3">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-2xl font-extrabold text-gray-900 tracking-tight">LifeGuard AI</span>
               </div>
               <p className="text-md text-gray-500 leading-relaxed font-medium">
                  Leading the transition to proactive, precision healthcare through advanced AI and human-centric design. HIPAA-certified and clinically verified.
               </p>
            </div>
            <div className="flex gap-16 md:gap-24">
               {[
                 { title: "Product", links: ["Risk Engine", "Health Hub", "Integrations"] },
                 { title: "Company", links: ["About Us", "Medical Board", "Contact"] },
                 { title: "Legal", links: ["Privacy Policy", "Terms of Service", "HIPAA Compliance"] }
               ].map((col, idx) => (
                 <div key={idx}>
                    <h4 className="font-extrabold text-gray-900 mb-6 text-sm tracking-widest uppercase">{col.title}</h4>
                    <ul className="space-y-4 text-md font-medium text-gray-500">
                       {col.links.map((link, i) => (
                         <li key={i}><a href="#" className="hover:text-blue-600 transition-colors">{link}</a></li>
                       ))}
                    </ul>
                 </div>
               ))}
            </div>
         </div>
         <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-semibold uppercase tracking-wider">
            <p>© 2026 LifeGuard Health. Human-Centric Precision.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
               <a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Home;