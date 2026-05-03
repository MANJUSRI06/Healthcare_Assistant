import { Apple, Dumbbell, Brain, WineOff, Droplets, BedDouble, ArrowRight, CheckCircle2, X, Activity, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

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

const MEAL_PLANS = {
  Cardiovascular: [
    { time: "Breakfast (7:30 AM)", meal: "Omega-3 Berry Oatmeal", desc: "1/2 cup steel-cut oats, 1 tbsp ground flaxseeds, 1/2 cup blueberries, and 1/4 cup walnuts. No added salt.", color: "text-blue-700", bg: "bg-blue-50/50" },
    { time: "Lunch (1:00 PM)", meal: "Mediterranean Quinoa Bowl", desc: "Cooked quinoa, chickpeas, cucumber, cherry tomatoes, olives, and a lemon-tahini dressing. High in healthy fats.", color: "text-emerald-700", bg: "bg-emerald-50/50" },
    { time: "Snack (4:00 PM)", meal: "Unsalted Almonds & Apple", desc: "A handful of raw almonds and a medium crisp apple for fiber and heart-healthy monounsaturated fats.", color: "text-orange-700", bg: "bg-orange-50/50" },
    { time: "Dinner (7:00 PM)", meal: "Baked Wild Salmon & Asparagus", desc: "5oz salmon fillet seasoned with lemon and herbs, served with a large portion of steamed asparagus and 1/2 sweet potato.", color: "text-indigo-700", bg: "bg-indigo-50/50" }
  ],
  Diabetes: [
    { time: "Breakfast (7:30 AM)", meal: "Protein-Packed Scramble", desc: "2 egg whites, 1 whole egg, sautéed spinach, and 1/4 avocado. Served with a small slice of sprouted grain toast.", color: "text-blue-700", bg: "bg-blue-50/50" },
    { time: "Lunch (1:00 PM)", meal: "Grilled Chicken & Kale Salad", desc: "4oz chicken breast, massaged kale, sunflower seeds, and a vinegar-based dressing. Low glycemic index to prevent spikes.", color: "text-emerald-700", bg: "bg-emerald-50/50" },
    { time: "Snack (4:00 PM)", meal: "Greek Yogurt & Chia", desc: "Unsweetened Greek yogurt with 1 tsp chia seeds. High protein and fiber content for sustained satiety.", color: "text-orange-700", bg: "bg-orange-50/50" },
    { time: "Dinner (7:00 PM)", meal: "Zucchini Noodles with Pesto", desc: "Spiralized zucchini with homemade basil pesto and grilled tofu or shrimp. Extremely low carb and nutrient dense.", color: "text-indigo-700", bg: "bg-indigo-50/50" }
  ],
  General: [
    { time: "Breakfast (7:30 AM)", meal: "Balanced Power Smoothie", desc: "Spinach, 1 scoop protein powder, 1/2 banana, 1 tbsp almond butter, and unsweetened almond milk.", color: "text-blue-700", bg: "bg-blue-50/50" },
    { time: "Lunch (1:00 PM)", meal: "Turkey & Avocado Wrap", desc: "Whole grain wrap with lean turkey, avocado, sprouts, and mustard. High protein and moderate healthy carbs.", color: "text-emerald-700", bg: "bg-emerald-50/50" },
    { time: "Snack (4:00 PM)", meal: "Cottage Cheese & Peaches", desc: "Low-fat cottage cheese with sliced fresh peaches. Provides a good mix of casein protein and natural vitamins.", color: "text-orange-700", bg: "bg-orange-50/50" },
    { time: "Dinner (7:00 PM)", meal: "Roasted Lean Beef & Broccoli", desc: "4oz lean steak strips stir-fried with plenty of broccoli, ginger, and garlic. Served with a small side of brown rice.", color: "text-indigo-700", bg: "bg-indigo-50/50" }
  ]
};

const HealthTips = () => {
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [latestPrediction, setLatestPrediction] = useState(null);
  const [weeklyProgress, setWeeklyProgress] = useState(65);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/predictions/history');
        if (data && data.length > 0) {
          const latest = data[0];
          setLatestPrediction(latest);
          
          if (latest.dailySteps) {
            const progress = Math.min(Math.round((latest.dailySteps / 10000) * 100), 100);
            setWeeklyProgress(progress);
          }
        }
      } catch (error) {
        console.error('Error fetching history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const isHighRisk = latestPrediction?.riskLevel === 'High';
  const category = latestPrediction?.possibleDiseaseCategory || 'General Wellness';

  const getMealPlan = () => {
    if (category.includes('Diabetes') || category.includes('Metabolic')) return MEAL_PLANS.Diabetes;
    if (category.includes('Cardiovascular') || category.includes('Heart')) return MEAL_PLANS.Cardiovascular;
    return MEAL_PLANS.General;
  };

  const getNutritionTip = () => {
    if (category.includes('Diabetes') || category.includes('Metabolic')) {
      return "Focus on complex carbohydrates with a low glycemic index. Prioritize high-fiber vegetables and lean proteins to stabilize your glucose levels and prevent energy crashes.";
    }
    if (category.includes('Cardiovascular') || category.includes('Heart')) {
      return "Adopt a heart-healthy Mediterranean diet. Increase intake of Omega-3 fatty acids from fish or seeds, and strictly limit sodium and saturated fats to manage blood pressure.";
    }
    return "Focus on whole, unprocessed foods. Incorporate a colorful variety of vegetables, lean proteins, and complex carbohydrates to sustain energy and support overall metabolic health.";
  };

  const getFitnessTip = () => {
    if (isHighRisk) {
      return "Start with low-impact aerobic activities like brisk walking or swimming. Aim for consistency over intensity to build a safe cardiovascular foundation.";
    }
    return "Aim for at least 150 minutes of moderate aerobic activity per week, plus muscle-strengthening exercises twice weekly to optimize metabolic rate.";
  };

  const getSubstanceTip = () => {
    if (latestPrediction?.smoker === 'yes' || latestPrediction?.alcohol === 'yes') {
      return "Your recent assessment indicates active consumption habits. Reducing or eliminating these can significantly lower your long-term risk of chronic disease within weeks.";
    }
    return "Maintain your current clean lifestyle. Avoiding tobacco products and limiting alcohol is the single most effective way to prevent chronic inflammation.";
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="font-bold text-gray-500 animate-pulse">Personalizing your wellness guide...</p>
    </div>
  );

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto pb-12 px-4 relative"
    >
      <div className="mb-12">
         <motion.div variants={itemVariants} className="inline-flex items-center bg-blue-100/50 border border-blue-200 text-blue-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
           <Sparkles className="w-3 h-3 mr-2" /> Personalized for your profile
         </motion.div>
         <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Personalized <span className="premium-gradient-text">Wellness Guide</span></motion.h1>
         <motion.p variants={itemVariants} className="text-gray-500 max-w-2xl text-lg font-medium">
           Based on your latest <span className="text-blue-600 font-bold">{category}</span> analysis, we've tailored these evidence-based clinical insights for you.
         </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <motion.div variants={itemVariants} className="md:col-span-2 glass-card border-white/60 overflow-hidden flex flex-col md:flex-row group">
            <div className="p-10 flex-1 flex flex-col justify-center">
               <div className="inline-flex items-center bg-emerald-100/50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold mb-6 w-max">
                  <Apple className="w-4 h-4 mr-2" /> Nutrition
               </div>
               <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Nutrition & Diet</h3>
               <p className="text-md text-gray-600 leading-relaxed mb-8 font-medium">
                 {getNutritionTip()}
               </p>
               <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm font-bold text-gray-800 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100/50 w-max"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" /> Targeted meal plan generated</li>
                  <li className="flex items-center text-sm font-bold text-gray-800 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100/50 w-max"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" /> Focus on unprocessed proteins</li>
               </ul>
               <button onClick={() => setShowMealPlan(true)} className="text-emerald-600 bg-emerald-50 hover:bg-emerald-100 font-extrabold text-sm flex items-center justify-center py-3 px-6 rounded-xl transition-all duration-300 w-max group/btn border border-emerald-200 shadow-sm">
                 View Your {category.split(' ')[0]} Meal Plan <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
               </button>
            </div>
            <div className="w-full md:w-2/5 relative overflow-hidden min-h-[300px]">
               <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Healthy Food" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-white/90 hidden md:block"></div>
            </div>
         </motion.div>

         <motion.div variants={itemVariants} className="glass-card border-white/60 p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform group">
            <div>
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Dumbbell className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Activity Status</h3>
               <p className="text-sm text-gray-600 leading-relaxed mb-8 font-medium">
                 {getFitnessTip()}
               </p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-50">
               <div className="flex justify-between text-xs font-extrabold text-gray-900 mb-3 uppercase tracking-wider">
                 <span>Active Progress</span>
                 <span className="text-blue-600">{weeklyProgress}%</span>
               </div>
               <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                 <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${weeklyProgress}%` }} 
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="bg-blue-500 h-full rounded-full"
                 ></motion.div>
               </div>
               <p className="text-[10px] text-gray-400 mt-2 font-bold text-center">BASED ON YOUR {latestPrediction?.dailySteps || 0} DAILY STEPS</p>
            </div>
         </motion.div>

         <motion.div variants={itemVariants} className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2.5rem] border border-orange-100 shadow-sm p-8 hover:-translate-y-1 transition-transform group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/40 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
               <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Mental Resilience</h3>
               <p className="text-sm text-orange-900/80 leading-relaxed font-medium">
                 {latestPrediction?.stressLevel === 'High' ? 
                   "Your stress levels are currently elevated. Prioritize 10-minute controlled breathing exercises twice daily to lower cortisol." : 
                   "Mental hygiene is as critical as physical. Practice mindfulness and ensure regular social connection to sustain metabolic health."}
               </p>
            </div>
         </motion.div>

         <motion.div variants={itemVariants} className="bg-gradient-to-br from-rose-50 to-red-50 rounded-[2.5rem] border border-red-100 shadow-sm p-8 hover:-translate-y-1 transition-transform group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/40 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
               <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <WineOff className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Substance Control</h3>
               <p className="text-sm text-red-900/80 leading-relaxed font-medium">
                 {getSubstanceTip()}
               </p>
            </div>
         </motion.div>

         <div className="flex flex-col gap-6 md:col-span-1">
            <motion.div variants={itemVariants} className="premium-gradient-bg rounded-[2rem] p-8 flex-1 flex items-center justify-between text-white shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-transform group overflow-hidden relative">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="relative z-10 w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30">
                 <Droplets className="w-7 h-7 text-white" />
               </div>
               <div className="text-right relative z-10">
                  <h3 className="font-extrabold text-xl mb-1">Hydration</h3>
                  <p className="text-xs text-blue-100 font-medium">Target: {latestPrediction?.waterIntake || 2.5}L daily.</p>
               </div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-8 flex-1 flex items-center justify-between shadow-xl hover:-translate-y-1 transition-transform group relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
               <div className="relative z-10 w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-indigo-500/30">
                 <BedDouble className="w-7 h-7 text-indigo-400" />
               </div>
               <div className="text-right relative z-10">
                  <h3 className="font-extrabold text-white text-xl mb-1">Sleep Hygiene</h3>
                  <p className="text-xs text-slate-400 font-medium">Aim for {latestPrediction?.sleepHours || 7.5} hrs.</p>
               </div>
            </motion.div>
         </div>
      </div>

      <AnimatePresence>
        {showMealPlan && (
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
              className="bg-white rounded-[2.5rem] shadow-2xl border border-white/20 w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 md:p-10 relative custom-scrollbar"
            >
               <button onClick={() => setShowMealPlan(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"><X className="w-5 h-5"/></button>
               
               <div className="flex items-center mb-8">
                 <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-sm border border-emerald-200">
                   <Apple className="w-7 h-7" />
                 </div>
                 <div>
                   <h2 className="text-3xl font-extrabold text-gray-900">{category.split(' ')[0]} Meal Plan</h2>
                   <p className="text-sm font-medium text-gray-500">Clinically optimized based on your health risk factor.</p>
                 </div>
               </div>

               <div className="space-y-4">
                  {getMealPlan().map((plan, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx }}
                      className={`border-2 border-gray-100 p-6 rounded-2xl hover:border-gray-300 transition-colors ${plan.bg}`}
                    >
                       <h4 className={`font-extrabold ${plan.color} mb-2 uppercase tracking-widest text-[10px]`}>{plan.time}</h4>
                       <p className="font-bold text-gray-900 text-lg mb-2">{plan.meal}</p>
                       <p className="text-sm text-gray-600 font-medium leading-relaxed">{plan.desc}</p>
                    </motion.div>
                  ))}
               </div>
               
               <div className="mt-8 pt-6 border-t border-gray-100">
                 <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMealPlan(false)} 
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 rounded-2xl transition-colors shadow-xl shadow-slate-900/20"
                 >
                   Got it, thanks!
                 </motion.button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HealthTips;