import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import {
  Download,
  RefreshCcw,
  Heart,
  Droplet,
  Moon,
  Activity,
  Info,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const generateHealthSummary = (result) => {
  const risks = result?.diseaseRisks || {};

  const detectedRisks = [];

  if (risks.cardiovascular === 1) {
    detectedRisks.push("cardiovascular risk");
  }

  if (risks.shortBreathing === 1) {
    detectedRisks.push("short-breathing related risk");
  }

  if (risks.obesity === 1) {
    detectedRisks.push("obesity-related risk");
  }

  if (detectedRisks.length > 0) {
    return {
      summary: `The trained model and clinical risk rules have identified possible ${detectedRisks.join(
        ", "
      )}. These are not confirmed diseases, but risk indicators based on the submitted health values. The user should monitor these parameters and consult a healthcare professional for proper evaluation.`,
      category: detectedRisks.join(", "),
    };
  }

  return {
    summary:
      "The trained Random Forest model has classified the user under low lifestyle disease risk. No major cardiovascular, breathing-related, or obesity risk indicators were detected from the submitted values.",
    category: "Low Lifestyle Disease Risk",
  };
};

const Result = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const { data } = await api.get(`/predictions/${id}`);
        setResult(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResult();
  }, [id]);

  if (!result) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-gray-500 animate-pulse">
          Analyzing clinical metrics...
        </p>
      </div>
    );
  }

  const healthSummary = generateHealthSummary(result);

  const isHighRisk = result.riskLevel === 'High';
  const isMediumRisk = result.riskLevel === 'Medium';

  const color = isHighRisk
    ? '#ef4444'
    : isMediumRisk
    ? '#f59e0b'
    : '#10b981';

  const glowColor = isHighRisk
    ? 'shadow-[0_0_40px_rgba(239,68,68,0.3)]'
    : isMediumRisk
    ? 'shadow-[0_0_40px_rgba(245,158,11,0.3)]'
    : 'shadow-[0_0_40px_rgba(16,185,129,0.3)]';

  const pieData = [
    { name: 'Risk', value: result.riskPercentage },
    { name: 'Safe', value: 100 - result.riskPercentage },
  ];

  const trendData = [
    {
      name: 'Current Risk',
      risk: result.riskPercentage,
      fill: '#3b82f6'
    },
    {
      name: 'Target Intervention',
      risk: Math.max(result.riskPercentage - 25, 10),
      fill: '#10b981'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto pb-12 px-4"
    >

      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-gray-200 pb-6 gap-4">

        <div>
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            AI Generated Report
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold text-gray-900 tracking-tight"
          >
            Health Analytics Report
          </motion.h1>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex gap-3 w-full md:w-auto"
        >

          <Link
            to="/predict"
            className="flex-1 md:flex-none justify-center flex items-center px-5 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-blue-200 transition-all"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Predict Again
          </Link>

          <button
            onClick={() => window.print()}
            className="flex-1 md:flex-none justify-center flex items-center px-5 py-3 premium-gradient-bg rounded-xl text-sm font-bold text-white shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>

        </motion.div>
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* LEFT SECTION */}

        <div className="space-y-6">

          {/* RISK STATUS */}

          <motion.div
            variants={itemVariants}
            className={`glass-card p-6 border-white/60 flex justify-between items-center ${
              isHighRisk
                ? 'bg-red-50/50 border-red-200'
                : isMediumRisk
                ? 'bg-orange-50/50 border-orange-200'
                : 'bg-emerald-50/50 border-emerald-200'
            }`}
          >

            <div>
              <h3 className="font-extrabold text-gray-900 text-lg">
                Risk Status
              </h3>

              <p className="text-xs text-gray-500 font-medium">
                Based on trained model output
              </p>
            </div>

            <div
              className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider shadow-sm ${
                isHighRisk
                  ? 'bg-red-500 text-white'
                  : isMediumRisk
                  ? 'bg-orange-500 text-white'
                  : 'bg-emerald-500 text-white'
              }`}
            >
              {result.riskLevel} Risk
            </div>

          </motion.div>

          {/* SCORE CARD */}

          <motion.div
            variants={itemVariants}
            className={`glass-card p-8 border-white/60 flex flex-col items-center text-center relative overflow-hidden ${glowColor}`}
          >

            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -z-10"></div>

            <h3 className="font-extrabold text-gray-900 text-xl mb-6">
              Lifestyle Disease Risk Score
            </h3>

            <div className="w-48 h-48 relative mb-6">

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={65}
                    outerRadius={85}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                  >
                    <Cell fill={color} />
                    <Cell fill="#f1f5f9" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                  className="text-5xl font-black text-gray-900"
                >
                  {result.riskPercentage}%
                </motion.span>

                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">
                  Probability
                </span>
              </div>

            </div>

            <p className="text-sm text-gray-600 font-medium leading-relaxed bg-white/50 p-4 rounded-2xl border border-white">
              The prediction is generated using the trained model target label:
              <span className="font-bold text-blue-600"> disease_risk</span>
            </p>

          </motion.div>
        </div>

        {/* RIGHT SECTION */}

        <div className="lg:col-span-2 space-y-6">

          {/* SUMMARY CARD */}

          <motion.div
            variants={itemVariants}
            className="glass-card p-8 border-white/60"
          >

            <h3 className="font-extrabold text-gray-900 text-xl mb-4 flex items-center">

              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mr-3">
                <Info className="w-5 h-5 text-blue-600" />
              </div>

              Clinical Health Summary

            </h3>

            <p className="text-gray-600 leading-relaxed text-md">
              {healthSummary.summary}
            </p>

            {/* CATEGORY */}

            <div className="mt-6 bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between shadow-lg">

              <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                Primary Category Focus
              </span>

              <span className="font-extrabold text-lg">
                {healthSummary.category}
              </span>

            </div>

            {/* ML EVIDENCE */}

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                <p className="text-xs font-bold text-blue-500 uppercase">
                  Target Label
                </p>

                <p className="font-extrabold text-gray-900">
                  disease_risk
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-100 rounded-xl p-3">
                <p className="text-xs font-bold text-purple-500 uppercase">
                  Model Output
                </p>

                <p className="font-extrabold text-gray-900">
                  {result.predictionLabel} 
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                <p className="text-xs font-bold text-emerald-500 uppercase">
                  Model Source
                </p>

                <p className="font-extrabold text-gray-900 text-sm">
                  Random Forest
                </p>
              </div>

            </div>

          </motion.div>

          {/* RECOMMENDATION CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {[
              {
                title: "Lifestyle",
                icon: Activity,
                color: "text-blue-600",
                bg: "bg-blue-100",
                border: "hover:border-blue-300",
                desc:
                  "Improve daily routine, reduce unhealthy habits, and maintain regular health monitoring based on the model result."
              },

              {
                title: "Diet",
                icon: Heart,
                color: "text-emerald-600",
                bg: "bg-emerald-100",
                border: "hover:border-emerald-300",
                desc:
                  "Follow a balanced diet with controlled calories, fiber-rich food, reduced sugar, and limited sodium intake."
              },

              {
                title: "Exercise",
                icon: Droplet,
                color: "text-orange-600",
                bg: "bg-orange-100",
                border: "hover:border-orange-300",
                desc:
                  "Maintain consistent physical activity such as walking, light cardio, or doctor-approved exercise routines."
              },

              {
                title: "Sleep",
                icon: Moon,
                color: "text-indigo-600",
                bg: "bg-indigo-100",
                border: "hover:border-indigo-300",
                desc:
                  "Maintain 7–8 hours of quality sleep and reduce screen time before bedtime for better recovery."
              }
            ].map((item, idx) => (

              <motion.div
                key={idx}
                variants={itemVariants}
                className={`glass-panel p-6 border-2 border-white transition-all duration-300 ${item.border} hover:-translate-y-1 hover:shadow-lg group`}
              >

                <div className="flex items-center mb-4">

                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${item.bg}`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>

                  <span className="font-extrabold text-gray-900 text-sm uppercase tracking-wider">
                    {item.title}
                  </span>

                </div>

                <p className="text-sm text-gray-600 leading-relaxed font-medium group-hover:text-gray-900 transition-colors">
                  {item.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </div>
      </div>

      {/* TREND SECTION */}

      <motion.div
        variants={itemVariants}
        className="glass-card p-8 border-white/60"
      >

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">

          <div>
            <h3 className="font-extrabold text-gray-900 text-xl mb-1">
              Health Trend Prediction
            </h3>

            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
              Projected risk reduction based on interventions
            </p>
          </div>

          {isHighRisk && (
            <div className="mt-4 md:mt-0 flex items-center bg-red-50 text-red-700 px-4 py-2 rounded-xl border border-red-200 text-sm font-bold">
              <ShieldAlert className="w-4 h-4 mr-2" />
              Immediate Action Advised
            </div>
          )}

        </div>

        <div className="h-72 w-full flex items-center justify-center bg-white/40 rounded-3xl p-4 border border-white">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fill: '#475569'
                }}
                dy={10}
              />

              <Tooltip
                cursor={{ fill: '#f1f5f9', opacity: 0.5 }}
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  fontWeight: 'bold'
                }}
              />

              <Bar
                dataKey="risk"
                radius={[12, 12, 0, 0]}
                maxBarSize={100}
              >

                {trendData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}

              </Bar>

            </BarChart>
          </ResponsiveContainer>

        </div>

      </motion.div>

    </motion.div>
  );
};

export default Result;