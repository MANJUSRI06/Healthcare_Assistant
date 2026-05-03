import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, Activity, Camera, X, Save, Edit3, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
   const { user, setUser } = useContext(AuthContext);
   const [history, setHistory] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const [loading, setLoading] = useState(false);
   const fileInputRef = useRef(null);

   const [editForm, setEditForm] = useState({
      name: '',
      age: '',
      height: '',
      weight: '',
      bloodGroup: '',
      profileImage: ''
   });

   useEffect(() => {
      if (user) {
         setEditForm({
            name: user.name,
            age: user.age,
            height: user.height,
            weight: user.weight,
            bloodGroup: user.bloodGroup || 'Not Provided',
            profileImage: user.profileImage || ''
         });
      }
   }, [user]);

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

   if (!user) return null;

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         if (file.size > 5000000) { // 5MB limit
            toast.error('Image size should be less than 5MB');
            return;
         }
         const reader = new FileReader();
         reader.onloadend = () => {
            setEditForm({ ...editForm, profileImage: reader.result });
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSave = async () => {
      setLoading(true);
      try {
         const { data } = await api.put('/user/profile', editForm);
         setUser({ ...user, ...data });
         toast.success('Profile updated successfully!');
         setIsEditing(false);
      } catch (error) {
         toast.error('Failed to update profile');
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently';

   return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto pb-12 px-4 relative"
    >
      <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-6">
        <div>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Account Settings</p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">User Profile</h1>
        </div>
        {!isEditing && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)} 
            className="premium-gradient-bg text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg shadow-blue-500/30 transition-all flex items-center group"
          >
            <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl border border-white/20 w-full max-w-md p-8 md:p-10 relative flex flex-col items-center"
            >
               <button onClick={() => setIsEditing(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"><X className="w-5 h-5"/></button>
               
               <h2 className="text-3xl font-extrabold text-gray-900 mb-8 w-full text-left">Edit Details</h2>

               <div className="relative mb-8 cursor-pointer group" onClick={() => fileInputRef.current.click()}>
                 <div className="w-32 h-32 premium-gradient-bg rounded-full p-1 shadow-xl">
                   <div className="w-full h-full bg-white rounded-full border-4 border-white overflow-hidden flex items-center justify-center text-5xl font-black text-gray-300 relative group-hover:scale-[0.98] transition-transform">
                      {editForm.profileImage ? (
                        <img src={editForm.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        user.name.charAt(0)
                      )}
                      <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                         <Camera className="w-8 h-8 text-white" />
                      </div>
                   </div>
                 </div>
               </div>
               <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />

               <div className="w-full space-y-5 text-left">
                 <div>
                   <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Full Name</label>
                   <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full font-bold border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-slate-50 focus:bg-white transition-all" placeholder="Full Name" />
                 </div>
                 <div className="grid grid-cols-2 gap-5">
                   <div>
                     <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Age</label>
                     <input type="number" value={editForm.age} onChange={(e) => setEditForm({...editForm, age: e.target.value})} className="w-full font-bold border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-slate-50 focus:bg-white transition-all" />
                   </div>
                   <div>
                     <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Blood Group</label>
                     <select value={editForm.bloodGroup} onChange={(e) => setEditForm({...editForm, bloodGroup: e.target.value})} className="w-full font-bold border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-slate-50 focus:bg-white transition-all appearance-none cursor-pointer">
                       <option>Not Provided</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                     </select>
                   </div>
                   <div>
                     <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Height (cm)</label>
                     <input type="number" value={editForm.height} onChange={(e) => setEditForm({...editForm, height: e.target.value})} className="w-full font-bold border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-slate-50 focus:bg-white transition-all" />
                   </div>
                   <div>
                     <label className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest ml-1 mb-1 block">Weight (kg)</label>
                     <input type="number" value={editForm.weight} onChange={(e) => setEditForm({...editForm, weight: e.target.value})} className="w-full font-bold border-2 border-gray-100 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 bg-slate-50 focus:bg-white transition-all" />
                   </div>
                 </div>
               </div>

               <div className="w-full grid grid-cols-2 gap-4 mt-8">
                  <button onClick={() => setIsEditing(false)} className="w-full bg-slate-100 text-gray-700 font-extrabold py-4 rounded-2xl hover:bg-slate-200 transition-colors">Cancel</button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave} 
                    disabled={loading} 
                    className="w-full premium-gradient-bg text-white font-extrabold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/30 flex justify-center items-center disabled:opacity-70"
                  >
                     {loading ? <Activity className="w-5 h-5 animate-spin"/> : <><Save className="w-5 h-5 mr-2" /> Save</>}
                  </motion.button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         {/* Identity Card */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-10 flex flex-col items-center text-center relative overflow-hidden group"
         >
            <div className="absolute top-0 w-full h-32 premium-gradient-bg opacity-10"></div>
            
            <div className="relative mb-6 group-hover:-translate-y-2 transition-transform duration-500 z-10 mt-4">
               <div className="w-32 h-32 premium-gradient-bg rounded-full p-1 shadow-2xl">
                 <div className="w-full h-full bg-white rounded-full border-4 border-white overflow-hidden flex items-center justify-center text-4xl font-black text-gray-300">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      user.name.charAt(0)
                    )}
                 </div>
               </div>
               <div className="absolute bottom-0 right-2 bg-emerald-500 text-white p-2 rounded-full border-4 border-white shadow-lg"><ShieldCheck className="w-5 h-5"/></div>
            </div>
            
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{user.name}</h2>
            <p className="text-md text-gray-500 font-medium mb-8 bg-slate-100 px-4 py-1 rounded-full">{user.email}</p>
            
            <div className="w-full flex justify-between bg-white/50 border border-white p-4 rounded-2xl shadow-sm">
               <div className="text-center w-1/2 border-r border-gray-100">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Member Since</p>
                  <p className="font-bold text-gray-900 text-sm">{joinDate}</p>
               </div>
               <div className="text-center w-1/2">
                  <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Blood Type</p>
                  <p className={`font-bold text-sm ${user.bloodGroup && user.bloodGroup !== 'Not Provided' ? 'text-red-600' : 'text-gray-900'}`}>{user.bloodGroup || 'Not Provided'}</p>
               </div>
            </div>
         </motion.div>

         {/* Stats Grid */}
         <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Age", value: user.age, unit: "yrs", color: "text-blue-700" },
              { label: "Gender", value: user.gender, unit: "", color: "text-blue-700" },
              { label: "Height", value: user.height, unit: "cm", color: "text-blue-700" },
              { label: "Weight", value: user.weight, unit: "kg", color: "text-blue-700" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 border-2 border-white flex flex-col justify-center hover:-translate-y-1 hover:shadow-lg transition-transform"
              >
                 <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                 <p className={`text-3xl font-black mt-2 ${stat.color}`}>{stat.value} <span className="text-sm font-bold text-gray-400">{stat.unit}</span></p>
              </motion.div>
            ))}

            {/* Giant BMI Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="col-span-2 lg:col-span-4 premium-gradient-bg rounded-[2rem] p-10 text-white flex justify-between items-center shadow-xl shadow-blue-500/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 group relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
               <div className="relative z-10">
                  <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md mb-4 border border-white/30">
                    Calculated Biometric
                  </div>
                  <p className="text-sm font-bold text-blue-100 uppercase tracking-widest mb-2">Body Mass Index (BMI)</p>
                  <p className="text-6xl font-black mb-1">{user.bmi}</p>
               </div>
               <div className="relative z-10 flex items-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                 {[4,7,3,8,5,9,4,6,8,5,10,7].map((h, i) => (
                   <div key={i} className="w-3 bg-white rounded-t-md hover:bg-blue-200 transition-colors cursor-pointer" style={{height: `${h * 6}px`}}></div>
                 ))}
               </div>
            </motion.div>
         </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-10 border-white/60"
      >
         <div className="flex justify-between items-center mb-8">
            <h3 className="font-extrabold text-gray-900 text-2xl flex items-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mr-3">
                <FileText className="w-5 h-5 text-gray-600"/>
              </div>
              Assessment History
            </h3>
         </div>

          <div className="space-y-4">
            {history.length > 0 ? history.map((pred, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                key={pred._id} 
                className="flex flex-col sm:flex-row sm:items-center p-5 border-2 border-white rounded-2xl hover:bg-white/60 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 bg-white/40 cursor-pointer group"
              >
                 <div className={`hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center mr-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${pred.riskLevel === 'High' ? 'bg-red-100 text-red-600' : pred.riskLevel === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                   <Activity className="w-7 h-7"/>
                 </div>
                 <div className="flex-1 mb-4 sm:mb-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-extrabold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">{pred.possibleDiseaseCategory}</h4>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${pred.riskLevel==='High'?'bg-red-100 text-red-700':pred.riskLevel==='Medium'?'bg-orange-100 text-orange-700':'bg-emerald-100 text-emerald-700'}`}>
                        {pred.riskLevel}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{new Date(pred.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                 </div>
                 <div className="text-right">
                    <Link to={`/result/${pred._id}`} className="inline-flex items-center bg-white text-gray-900 group-hover:bg-blue-600 group-hover:text-white text-xs font-bold px-5 py-3 rounded-xl border border-gray-200 group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                      View Full Report <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </div>
              </motion.div>
            )) : (
              <div className="text-center py-16 bg-slate-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">No assessments yet</h3>
                <p className="text-sm text-gray-500">Your clinical history will appear here once you take an assessment.</p>
              </div>
            )}
         </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;