import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Activity, AlertTriangle, Pill, Brain, Calendar, Users, Stethoscope, Search, LayoutDashboard, FlaskConical, Download, Cpu, X, Plus 
} from 'lucide-react';

// --- DUMMY DATA ---
const patientGrowthData = [
  { day: 'Mon', patients: 1200 },
  { day: 'Tue', patients: 1350 },
  { day: 'Wed', patients: 1250 },
  { day: 'Thu', patients: 1500 },
  { day: 'Fri', patients: 1680 },
  { day: 'Sat', patients: 1800 },
  { day: 'Sun', patients: 2100 },
];

const emergencyCases = [
  { id: 1, ward: 'ICU Bed 4', issue: 'BP Spike', critical: true },
  { id: 2, ward: 'ER Bay 2', issue: 'Trauma', critical: true },
  { id: 3, ward: 'Cardiology 1', issue: 'Arrhythmia', critical: false },
];

const pharmacyInventory = [
  { name: 'Amoxicillin', stock: 85, status: 'good' },
  { name: 'Epinephrine', stock: 12, status: 'low' },
  { name: 'Propofol', stock: 45, status: 'moderate' },
];

const appointments = [
  { id: 1, doctor: 'Dr. Sarah Chen', spec: 'Neurology', time: '10:00 AM', avatar: '👩‍⚕️' },
  { id: 2, doctor: 'Dr. James Wilson', spec: 'Cardiology', time: '10:30 AM', avatar: '👨‍⚕️' },
  { id: 3, doctor: 'Dr. Emily Stone', spec: 'Pediatrics', time: '11:15 AM', avatar: '👩‍⚕️' },
];

const patientsList = [
  { id: 'PT-001', name: 'Marcus Johnson', avatar: '👨', condition: 'Critical', ward: 'ICU-1', diagnosis: 'Cardiac Arrest' },
  { id: 'PT-002', name: 'Elena Rodriguez', avatar: '👩', condition: 'Stable', ward: 'Gen-4', diagnosis: 'Post-op Recovery' },
  { id: 'PT-003', name: 'James Smith', avatar: '👨‍🦳', condition: 'Observation', ward: 'Cardio-2', diagnosis: 'Arrhythmia' },
  { id: 'PT-004', name: 'Sarah Connor', avatar: '👩‍🦰', condition: 'Critical', ward: 'ICU-3', diagnosis: 'Trauma' },
  { id: 'PT-005', name: 'David Kim', avatar: '👨‍🦱', condition: 'Stable', ward: 'Gen-1', diagnosis: 'Pneumonia' },
];

const timelineAppointments = [
  { time: '09:00 AM', patient: 'Sarah Connor', doctor: 'Dr. Vance', type: 'Surgery Prep' },
  { time: '10:30 AM', patient: 'James Smith', doctor: 'Dr. Chen', type: 'Consultation' },
  { time: '11:45 AM', patient: 'Elena Rodriguez', doctor: 'Dr. Wilson', type: 'Post-op Check' },
  { time: '01:00 PM', patient: 'Marcus Johnson', doctor: 'Dr. Vance', type: 'ICU Review' },
];

const labResults = [
  { id: 'LAB-992', patient: 'Elena Rodriguez', test: 'Complete Blood Count', date: 'Today, 08:30 AM', status: 'Ready' },
  { id: 'LAB-993', patient: 'Marcus Johnson', test: 'Comprehensive Metabolic Panel', date: 'Today, 09:15 AM', status: 'Requires Review' },
  { id: 'LAB-994', patient: 'Sarah Connor', test: 'CT Scan (Head)', date: 'Yesterday, 14:00 PM', status: 'Ready' },
];

const patientVitalsData = [
  { time: '08:00', heartRate: 75, bpSys: 120 },
  { time: '12:00', heartRate: 82, bpSys: 125 },
  { time: '16:00', heartRate: 78, bpSys: 118 },
  { time: '20:00', heartRate: 85, bpSys: 130 },
  { time: '00:00', heartRate: 72, bpSys: 115 },
  { time: '04:00', heartRate: 70, bpSys: 112 },
];

// --- CORE COMPONENTS ---

const Card = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ 
      scale: 1.02, 
      y: -5,
      boxShadow: "0 10px 30px -10px rgba(0, 229, 255, 0.4)",
      borderColor: "rgba(0, 229, 255, 0.3)" 
    }}
    className={`glass-card p-6 flex flex-col transition-colors ${className}`}
  >
    {children}
  </motion.div>
);

const Sidebar = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Users, label: 'Patients' },
    { icon: Calendar, label: 'Appointments' },
    { icon: FlaskConical, label: 'Lab Results' },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-20 lg:w-64 h-full border-r border-white/10 bg-slate-900/50 backdrop-blur-xl flex flex-col items-center lg:items-start py-8 px-4 gap-8 shrink-0 z-20"
    >
      <div className="flex items-center gap-3 px-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(0,229,255,0.1)] shrink-0">
          <Stethoscope className="text-[var(--color-electric-cyan)] w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white hidden lg:block">
          NEXUS<span className="text-[var(--color-electric-cyan)] font-light">MED</span>
        </h1>
      </div>
      
      <nav className="flex flex-col gap-3 w-full">
        {menuItems.map((item, idx) => {
          const isActive = currentView === item.label;
          return (
            <motion.div 
              key={idx}
              onClick={() => setCurrentView(item.label)}
              whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-[var(--color-electric-cyan)]/10 text-[var(--color-electric-cyan)] border border-[var(--color-electric-cyan)]/20 shadow-[0_0_10px_rgba(0,229,255,0.1)]' : 'text-slate-400 hover:text-white border border-transparent'}`}
            >
              <item.icon className="w-6 h-6 shrink-0" />
              <span className="font-medium hidden lg:block">{item.label}</span>
            </motion.div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

const Header = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center mb-8 px-2"
    >
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[var(--color-electric-cyan)] transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search Patient via Neural Link..." 
            className="w-full bg-slate-900/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[var(--color-electric-cyan)]/50 focus:ring-1 focus:ring-[var(--color-electric-cyan)]/50 transition-all shadow-inner"
          />
          <div className="absolute inset-0 rounded-2xl bg-[var(--color-electric-cyan)]/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity"></div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 ml-4 shrink-0">
        <div className="hidden lg:flex flex-col items-end border-r border-white/10 pr-6">
          <p className="text-white font-mono text-lg tracking-wider">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</p>
          <p className="text-[var(--color-electric-cyan)] text-xs font-medium uppercase tracking-widest">{time.toLocaleDateString()}</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-slate-200 font-medium">Dr. A. Vance</p>
          <p className="text-[var(--color-electric-cyan)] text-xs">Chief of Medicine</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-slate-800 border border-[var(--color-electric-cyan)] overflow-hidden flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          👨‍⚕️
        </div>
      </div>
    </motion.header>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_0_50px_rgba(0,229,255,0.15)] z-50 overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-800/30">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">{title}</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- VIEWS ---

const DashboardView = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 grid-flow-row-dense pb-8">
    <Card className="col-span-1 xl:col-span-2" delay={0.1}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-slate-300 flex items-center gap-2">
            <Users className="w-5 h-5 text-[var(--color-electric-cyan)]" />
            Total Active Patients
          </h2>
          <p className="text-5xl font-bold text-white mt-2 neon-text-cyan">2,100</p>
          <p className="text-[var(--color-success-green)] text-sm mt-1 font-medium">+12% from last week</p>
        </div>
      </div>
      <div className="flex-1 min-h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={patientGrowthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-electric-cyan)" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="var(--color-electric-cyan)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="day" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="patients" stroke="var(--color-electric-cyan)" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>

    <Card className="col-span-1 border-[var(--color-critical-red)]/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]" delay={0.2}>
      <h2 className="text-lg font-medium text-slate-300 flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-[var(--color-critical-red)]" />
        Emergency Live Ticker
      </h2>
      <div className="flex flex-col gap-3">
        {emergencyCases.map((caseItem) => (
          <div key={caseItem.id} className="bg-slate-900/50 rounded-xl p-3 flex items-center justify-between border border-white/5">
            <div>
              <p className="text-sm font-medium text-white">{caseItem.ward}</p>
              <p className="text-xs text-slate-400">{caseItem.issue}</p>
            </div>
            {caseItem.critical ? (
              <motion.div 
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="w-3 h-3 rounded-full bg-[var(--color-critical-red)] shadow-[0_0_10px_var(--color-critical-red)]"
              />
            ) : (
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
            )}
          </div>
        ))}
      </div>
    </Card>

    <Card className="col-span-1 overflow-hidden relative" delay={0.3}>
      <h2 className="text-lg font-medium text-slate-300 flex items-center gap-2 mb-4 relative z-20">
        <Brain className="w-5 h-5 text-[var(--color-soft-blue)]" />
        AI Diagnostic Assistant
      </h2>
      <div className="flex-1 flex flex-col items-center justify-center relative py-4">
        <div className="relative w-24 h-24 flex items-center justify-center mb-4">
          <Brain className="w-16 h-16 text-slate-600 absolute" />
          <motion.div 
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="absolute left-0 w-full h-[3px] bg-[var(--color-electric-cyan)] shadow-[0_0_20px_var(--color-electric-cyan)] z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-electric-cyan)]/10 to-transparent mix-blend-overlay"></div>
        </div>
        <div className="bg-[var(--color-soft-blue)]/10 border border-[var(--color-soft-blue)]/20 rounded-xl p-3 w-full text-center mt-2">
          <p className="text-sm text-slate-300 mb-1">AI Prediction Result:</p>
          <p className="text-base font-medium text-[var(--color-soft-blue)] drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
            85% Flu probability in Ward A
          </p>
        </div>
      </div>
    </Card>

    <Card className="col-span-1 xl:col-span-2" delay={0.4}>
      <h2 className="text-lg font-medium text-slate-300 flex items-center gap-2 mb-6">
        <Pill className="w-5 h-5 text-[var(--color-success-green)]" />
        Smart Pharmacy Inventory
      </h2>
      <div className="flex flex-col justify-around flex-1 gap-4">
        {pharmacyInventory.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-white font-medium">{item.name}</span>
              <span className={item.status === 'low' ? 'text-[var(--color-critical-red)] font-bold' : 'text-slate-400'}>
                {item.stock}% {item.status === 'low' && '(Low Stock)'}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.stock}%` }}
                transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                className={`h-full rounded-full ${
                  item.status === 'low' ? 'bg-[var(--color-critical-red)] shadow-[0_0_10px_var(--color-critical-red)]' : 
                  item.status === 'moderate' ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 
                  'bg-[var(--color-success-green)] shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>

    <Card className="col-span-1" delay={0.6}>
      <h2 className="text-lg font-medium text-slate-300 flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-[var(--color-critical-red)]" />
        Real-time Vitals (ICU-1)
      </h2>
      <div className="flex items-end gap-4 mb-4">
        <p className="text-5xl font-bold text-white neon-text-red">84</p>
        <p className="text-slate-400 text-lg pb-1">BPM</p>
      </div>
      <div className="w-full h-16 bg-slate-900/50 rounded-xl overflow-hidden relative border border-white/5 flex items-center">
        <motion.svg 
          viewBox="0 0 100 20" 
          className="w-[200%] h-full text-[var(--color-critical-red)]" 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 1.5, repeat: Infinity }}
          preserveAspectRatio="none"
        >
          <polyline 
            points="0,10 5,10 10,10 12,5 14,15 16,0 18,18 20,10 25,10 30,10 35,10 37,5 39,15 41,0 43,18 45,10 50,10 55,10 60,10 62,5 64,15 66,0 68,18 70,10 75,10 80,10 85,10 87,5 89,15 91,0 93,18 95,10 100,10" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          />
        </motion.svg>
      </div>
      <p className="text-xs text-slate-500 mt-4 text-center">Patient stable. No arrhythmias detected.</p>
    </Card>

    <Card className="col-span-1" delay={0.5}>
      <h2 className="text-lg font-medium text-slate-300 flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-[var(--color-electric-cyan)]" />
        Upcoming Consultations
      </h2>
      <div className="flex flex-col gap-3">
        {appointments.map((apt) => (
          <div key={apt.id} className="flex items-center gap-3 p-3 bg-slate-900/40 rounded-xl hover:bg-slate-800/60 transition-colors border border-transparent hover:border-white/10 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg shadow-inner">
              {apt.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{apt.doctor}</p>
              <p className="text-xs text-slate-400">{apt.spec}</p>
            </div>
            <div className="text-xs font-semibold text-[var(--color-electric-cyan)] bg-[var(--color-electric-cyan)]/10 px-2 py-1 rounded-md border border-[var(--color-electric-cyan)]/20">
              {apt.time}
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const PatientsView = ({ onSelectPatient, onAddPatient }) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
        <Users className="text-[var(--color-electric-cyan)] w-7 h-7" /> Active Patients List
      </h2>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        onClick={onAddPatient}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-electric-cyan)] text-slate-900 font-bold transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]"
      >
        <Plus className="w-5 h-5" /> New Admission
      </motion.button>
    </div>
    <Card className="overflow-x-auto p-0 border border-white/10 rounded-[32px]">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-white/10 bg-slate-900/60">
            <th className="p-5 text-slate-400 font-medium text-sm">Patient Name</th>
            <th className="p-5 text-slate-400 font-medium text-sm">ID</th>
            <th className="p-5 text-slate-400 font-medium text-sm">Diagnosis</th>
            <th className="p-5 text-slate-400 font-medium text-sm">Ward No</th>
            <th className="p-5 text-slate-400 font-medium text-sm">Condition</th>
            <th className="p-5 text-slate-400 font-medium text-sm text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {patientsList.map((pt, idx) => (
            <tr key={idx} className="border-b border-white/5 hover:bg-slate-800/60 transition-colors">
              <td className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-xl border border-white/10 shadow-inner">{pt.avatar}</div>
                <span className="text-white font-medium">{pt.name}</span>
              </td>
              <td className="p-5 text-slate-300 font-mono text-sm">{pt.id}</td>
              <td className="p-5 text-slate-300">{pt.diagnosis}</td>
              <td className="p-5 text-slate-400 font-medium">{pt.ward}</td>
              <td className="p-5">
                {pt.condition === 'Critical' ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-critical-red)]/10 text-[var(--color-critical-red)] border border-[var(--color-critical-red)]/30 shadow-[0_0_10px_rgba(239,68,68,0.2)] text-xs font-bold uppercase tracking-wider">
                    <motion.span 
                      animate={{ opacity: [1, 0.4, 1], scale: [1, 1.4, 1] }} 
                      transition={{ repeat: Infinity, duration: 1 }} 
                      className="w-2.5 h-2.5 rounded-full bg-[var(--color-critical-red)] shadow-[0_0_8px_var(--color-critical-red)]" 
                    />
                    Critical
                  </span>
                ) : pt.condition === 'Observation' ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    Observation
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-success-green)]/10 text-[var(--color-success-green)] border border-[var(--color-success-green)]/30 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-success-green)]" />
                    Stable
                  </span>
                )}
              </td>
              <td className="p-5 text-right">
                <motion.button 
                  onClick={() => onSelectPatient(pt)}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 229, 255, 0.15)" }}
                  className="px-5 py-2 rounded-xl bg-[var(--color-electric-cyan)]/10 text-[var(--color-electric-cyan)] border border-[var(--color-electric-cyan)]/30 text-sm font-medium transition-colors hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                >
                  View Details
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const AppointmentsView = () => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
      <Calendar className="text-[var(--color-electric-cyan)] w-7 h-7" /> Schedule & Timeline
    </h2>
    <div className="relative border-l-2 border-white/10 ml-6 pl-10 space-y-8 py-4 max-w-4xl">
      {timelineAppointments.map((apt, idx) => (
        <div key={idx} className="relative">
          <div className="absolute -left-[51px] top-5 w-5 h-5 rounded-full bg-slate-900 border-2 border-[var(--color-electric-cyan)] shadow-[0_0_10px_rgba(0,229,255,0.4)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[var(--color-electric-cyan)]" />
          </div>
          <Card className="w-full">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--color-electric-cyan)] font-mono text-sm mb-2">{apt.time}</p>
                <h3 className="text-xl font-bold text-white mb-2">{apt.type}</h3>
                <p className="text-slate-400 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" /> Patient: <span className="text-slate-200">{apt.patient}</span>
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm bg-slate-800 text-slate-300 px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
                  {apt.doctor}
                </span>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

const LabResultsView = ({ onAnalyzeLab, analyzingLabId }) => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
      <FlaskConical className="text-[var(--color-electric-cyan)] w-7 h-7" /> Recent Lab Reports
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {labResults.map((lab, idx) => (
        <Card key={idx} className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 font-mono text-xs mb-2">{lab.id} • {lab.date}</p>
              <h3 className="text-xl font-bold text-white leading-tight">{lab.test}</h3>
              <p className="text-slate-300 mt-2 flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-slate-500" /> Patient: {lab.patient}
              </p>
            </div>
            {lab.status === 'Requires Review' ? (
              <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Requires Review
              </span>
            ) : (
              <span className="bg-[var(--color-success-green)]/10 text-[var(--color-success-green)] border border-[var(--color-success-green)]/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Ready
              </span>
            )}
          </div>
          <div className="flex gap-4 mt-2 pt-5 border-t border-white/10">
            <motion.button 
              onClick={() => onAnalyzeLab(lab.id)}
              disabled={analyzingLabId !== null}
              whileHover={analyzingLabId === lab.id ? {} : { scale: 1.03 }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-bold transition-colors ${
                analyzingLabId === lab.id 
                  ? 'bg-[var(--color-electric-cyan)]/30 text-[var(--color-electric-cyan)] border-[var(--color-electric-cyan)] shadow-[0_0_20px_rgba(0,229,255,0.5)] animate-pulse'
                  : 'bg-[var(--color-electric-cyan)]/10 text-[var(--color-electric-cyan)] border-[var(--color-electric-cyan)]/30 hover:bg-[var(--color-electric-cyan)]/20 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]'
              }`}
            >
              <Cpu className="w-5 h-5" /> {analyzingLabId === lab.id ? 'Neural Scanning...' : 'AI Analysis'}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-200 border border-white/10 text-sm font-medium transition-colors hover:bg-slate-700 hover:text-white"
            >
              <Download className="w-5 h-5" /> Download PDF
            </motion.button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentView, setCurrentView] = useState('Dashboard');
  
  // Modal states
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [analyzingLabId, setAnalyzingLabId] = useState(null);
  const [aiResultLab, setAiResultLab] = useState(null);

  // Simulated AI Analysis delay
  useEffect(() => {
    if (analyzingLabId) {
      const timer = setTimeout(() => {
        const lab = labResults.find(l => l.id === analyzingLabId);
        setAnalyzingLabId(null);
        setAiResultLab(lab);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [analyzingLabId]);

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-slate-950">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="flex-1 h-full overflow-y-auto p-4 md:p-8 relative">
        <div className="max-w-7xl mx-auto min-h-full flex flex-col">
          <Header />
          
          <div className="flex-1 relative mt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full w-full"
              >
                {currentView === 'Dashboard' && <DashboardView />}
                {currentView === 'Patients' && <PatientsView onSelectPatient={setSelectedPatient} onAddPatient={() => setIsAddPatientOpen(true)} />}
                {currentView === 'Appointments' && <AppointmentsView />}
                {currentView === 'Lab Results' && <LabResultsView onAnalyzeLab={setAnalyzingLabId} analyzingLabId={analyzingLabId} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      <Modal isOpen={isAddPatientOpen} onClose={() => setIsAddPatientOpen(false)} title={<><Users className="text-[var(--color-electric-cyan)]"/> New Patient Admission</>}>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Full Name</label>
              <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-[var(--color-electric-cyan)]/50 focus:ring-1 focus:ring-[var(--color-electric-cyan)]/50 transition-all shadow-inner" placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Patient ID</label>
              <input type="text" className="w-full bg-slate-900/30 border border-white/5 rounded-xl p-3.5 text-slate-500 cursor-not-allowed" placeholder="Auto-generated" disabled />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Diagnosis</label>
            <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-[var(--color-electric-cyan)]/50 focus:ring-1 focus:ring-[var(--color-electric-cyan)]/50 transition-all shadow-inner" placeholder="Initial Diagnosis..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Ward Assignment</label>
              <select className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-[var(--color-electric-cyan)]/50 shadow-inner">
                <option>ICU-1</option>
                <option>Gen-4</option>
                <option>Cardio-2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Initial Condition</label>
              <select className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-[var(--color-electric-cyan)]/50 shadow-inner">
                <option>Stable</option>
                <option>Observation</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
          <div className="pt-8 flex justify-end gap-4">
            <button onClick={() => setIsAddPatientOpen(false)} className="px-6 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">Cancel</button>
            <button onClick={() => setIsAddPatientOpen(false)} className="px-6 py-3 rounded-xl bg-[var(--color-electric-cyan)] text-slate-900 font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:scale-105">Admit Patient</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title={<><Activity className="text-[var(--color-electric-cyan)]"/> Patient Overview</>}>
        {selectedPatient && (
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-5 rounded-2xl bg-slate-800/30 border border-white/5 shadow-inner">
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-4xl shadow-inner border border-white/10 shrink-0">
                {selectedPatient.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white tracking-wide">{selectedPatient.name}</h3>
                <p className="text-[var(--color-electric-cyan)] font-mono text-sm mt-1">{selectedPatient.id} • Ward: {selectedPatient.ward}</p>
                <p className="text-slate-400 text-sm mt-2">{selectedPatient.diagnosis}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400 mb-2">Current Status</p>
                <span className={`inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  selectedPatient.condition === 'Critical' ? 'bg-[var(--color-critical-red)]/10 text-[var(--color-critical-red)] border border-[var(--color-critical-red)]/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                  selectedPatient.condition === 'Observation' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30' :
                  'bg-[var(--color-success-green)]/10 text-[var(--color-success-green)] border border-[var(--color-success-green)]/30'
                }`}>
                  {selectedPatient.condition}
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-slate-200 mb-5 flex items-center gap-2"><Activity className="w-5 h-5 text-slate-400" /> Vitals Trend (Last 24h)</h4>
              <div className="h-[280px] w-full bg-slate-900/40 rounded-2xl p-5 border border-white/5">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patientVitalsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis yAxisId="left" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="heartRate" name="Heart Rate (BPM)" stroke="var(--color-critical-red)" strokeWidth={3} dot={{ fill: 'var(--color-critical-red)', r: 4 }} activeDot={{ r: 6, shadow: '0 0 10px red' }} />
                    <Line yAxisId="right" type="monotone" dataKey="bpSys" name="BP Systolic" stroke="var(--color-electric-cyan)" strokeWidth={3} dot={{ fill: 'var(--color-electric-cyan)', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!aiResultLab} onClose={() => setAiResultLab(null)} title={<><Brain className="text-[var(--color-soft-blue)]"/> Neural AI Insight</>}>
        {aiResultLab && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-[var(--color-soft-blue)]/10 border border-[var(--color-soft-blue)]/20 text-center relative overflow-hidden">
              <motion.div 
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-soft-blue)]/20 to-transparent"
              />
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{aiResultLab.test} Analysis</h3>
              <p className="text-[var(--color-soft-blue)] font-mono text-sm relative z-10">Patient: {aiResultLab.patient}</p>
            </div>
            
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Observation</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The metabolic panel indicates slightly elevated glucose levels. Neural predictive models suggest a 15% risk of developing insulin resistance if current trends persist over the next 6 months.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-success-green)]/10 flex items-center justify-center shrink-0 border border-[var(--color-success-green)]/20">
                  <Stethoscope className="w-5 h-5 text-[var(--color-success-green)]" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Recommendation</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Proceed with standard dietary intervention protocols. Schedule follow-up HbA1c test in 90 days. No immediate pharmacological intervention required.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button onClick={() => setAiResultLab(null)} className="px-6 py-3 rounded-xl bg-[var(--color-electric-cyan)] text-slate-900 font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] transition-all hover:scale-105">Acknowledge</button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
