import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { Activity, Plus, TrendingUp, AlertTriangle, ShieldCheck, Heart, Moon, Flame, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/predictions/history');
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history', error);
      }
    };
    fetchHistory();
  }, []);

  const latestPrediction = history[0];
  const chartData = history.slice(0, 7).reverse().map(p => ({
    date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    risk: p.riskPercentage
  }));

  const bmiValue = user?.bmi || 0;
  const bmiCategory = bmiValue < 18.5 ? 'Underweight' : bmiValue < 25 ? 'Normal' : bmiValue < 30 ? 'Overweight' : 'Obese';
  const bmiColor = bmiCategory === 'Normal' ? 'text-emerald-500' : bmiCategory === 'Underweight' ? 'text-amber-500' : 'text-red-500';

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];
  const riskDistribution = [
    { name: 'Low', value: history.filter(h => h.riskLevel === 'Low').length || 1 },
    { name: 'Medium', value: history.filter(h => h.riskLevel === 'Medium').length || 0 },
    { name: 'High', value: history.filter(h => h.riskLevel === 'High').length || 0 }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto pb-12 px-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <motion.div variants={itemVariants} className="inline-flex items-center bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            Live Data Feed
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl font-extrabold text-gray-900 tracking-tight">Clinical Dashboard</motion.h1>
          <motion.p variants={itemVariants} className="text-gray-500 mt-2 text-lg">Welcome back, <span className="font-bold text-gray-900">{user?.name?.split(' ')[0]}</span>. Here's your biological overview.</motion.p>
        </div>
        <motion.div variants={itemVariants}>
          <Link to="/predict" className="premium-gradient-bg text-white px-6 py-3.5 rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center group">
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" /> New Assessment
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* BMI Card */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-6 border-white/60 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
            <Activity className="w-32 h-32" />
          </div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-gray-500 font-extrabold tracking-widest text-[10px] uppercase mb-1">Body Mass Index</h3>
              <div className="text-5xl font-black text-gray-900">{bmiValue}</div>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-xs font-extrabold border ${bmiCategory === 'Normal' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {bmiCategory}
            </div>
          </div>
          
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex shadow-inner">
            <div className="bg-amber-400 h-full" style={{ width: '18.5%' }}></div>
            <div className="bg-emerald-400 h-full" style={{ width: '6.5%' }}></div>
            <div className="bg-orange-400 h-full" style={{ width: '5%' }}></div>
            <div className="bg-red-500 h-full flex-1"></div>
          </div>
          <div className="relative w-full mt-2">
            <div className="absolute top-0 -ml-2" style={{ left: `${Math.min(Math.max(bmiValue, 15), 40) / 40 * 100}%` }}>
               <div className="w-4 h-4 bg-gray-900 rounded-full border-2 border-white shadow-md"></div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mt-4">
            <span>Under</span>
            <span>Normal</span>
            <span>Over</span>
            <span>Obese</span>
          </div>
        </motion.div>

        {/* Risk Card */}
        <motion.div variants={itemVariants} className={`lg:col-span-2 glass-card p-6 relative overflow-hidden ${latestPrediction?.riskLevel === 'High' ? 'bg-red-50/80 border-red-200' : latestPrediction?.riskLevel === 'Medium' ? 'bg-orange-50/80 border-orange-200' : 'bg-emerald-50/80 border-emerald-200'}`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-extrabold tracking-widest text-[10px] uppercase mb-1 ${latestPrediction?.riskLevel === 'High' ? 'text-red-700' : latestPrediction?.riskLevel === 'Medium' ? 'text-orange-700' : 'text-emerald-700'}`}>Current Risk Status</h3>
              {latestPrediction ? (
                 <>
                  <div className={`text-4xl font-black mb-2 ${latestPrediction.riskLevel === 'High' ? 'text-red-900' : latestPrediction.riskLevel === 'Medium' ? 'text-orange-900' : 'text-emerald-900'}`}>{latestPrediction.riskLevel} Risk</div>
                  <p className="text-sm font-bold text-gray-700 bg-white/60 px-3 py-1 rounded-lg inline-block border border-white">{latestPrediction.possibleDiseaseCategory}</p>
                 </>
              ) : (
                 <div className="text-gray-500 mt-4 font-medium">No assessments taken yet.</div>
              )}
            </div>
            {latestPrediction && (
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${latestPrediction.riskLevel === 'High' ? 'bg-red-500 text-white shadow-red-500/40' : latestPrediction.riskLevel === 'Medium' ? 'bg-orange-500 text-white shadow-orange-500/40' : 'bg-emerald-500 text-white shadow-emerald-500/40'}`}>
                {latestPrediction.riskLevel === 'High' ? <AlertTriangle className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
              </div>
            )}
          </div>
          {latestPrediction && (
             <div className="mt-6 flex items-center">
               <div className="flex-1 bg-white/60 h-3 rounded-full overflow-hidden mr-4 border border-white">
                 <div className={`h-full rounded-full ${latestPrediction.riskLevel === 'High' ? 'bg-red-500' : latestPrediction.riskLevel === 'Medium' ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${latestPrediction.riskPercentage}%` }}></div>
               </div>
               <span className="text-sm font-extrabold text-gray-800">{latestPrediction.riskPercentage}% Probability</span>
             </div>
          )}
        </motion.div>
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Age", value: `${user?.age} yrs`, icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Weight", value: `${user?.weight} kg`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
          { label: "Heart Rate", value: "72 bpm", icon: Heart, color: "text-rose-600", bg: "bg-rose-100" },
          { label: "Sleep", value: "7.5 hrs", icon: Moon, color: "text-indigo-600", bg: "bg-indigo-100" }
        ].map((stat, idx) => (
          <motion.div key={idx} variants={itemVariants} className="glass-panel p-4 flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-8 border-white/60">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">Health Trend Prediction</h3>
              <p className="text-sm font-medium text-gray-500">Risk probability changes over time</p>
            </div>
            <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-100">Risk % over time</span>
          </div>
          <div className="h-72 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} 
                    itemStyle={{color: '#0f172a', fontWeight: 800}}
                  />
                  <Area type="monotone" dataKey="risk" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRisk)" activeDot={{r: 8, strokeWidth: 0, fill: '#3b82f6'}} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 font-medium bg-slate-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                <Activity className="w-12 h-12 mb-3 text-gray-300" />
                <p>Take multiple assessments to see trends.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* History Section */}
        <motion.div variants={itemVariants} className="glass-card p-8 border-white/60 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-extrabold text-gray-900">Recent History</h3>
            <Link to="/profile" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">View All</Link>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {history.length > 0 ? history.slice(0,5).map((pred) => (
              <Link to={`/result/${pred._id}`} key={pred._id} className="block group">
                <div className="p-4 rounded-2xl bg-white/60 border border-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">{new Date(pred.createdAt).toLocaleDateString()}</span>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${pred.riskLevel==='High'?'bg-red-100 text-red-700':pred.riskLevel==='Medium'?'bg-orange-100 text-orange-700':'bg-emerald-100 text-emerald-700'}`}>
                      {pred.riskLevel}
                    </span>
                  </div>
                  <p className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{pred.possibleDiseaseCategory}</p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors flex items-center">
                    View Report &rarr;
                  </p>
                </div>
              </Link>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium text-sm">Your assessment history will appear here.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;