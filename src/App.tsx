import { useState, useEffect } from 'react';
import { MOCK_LABS, type AISummary, type LabReport } from './types';
import { motion } from 'motion/react';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  Loader2,
  TrendingUp,
  BrainCircuit,
  FileDown,
  Calendar,
  User,
  ShieldCheck,
  LineChart as LineIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './lib/utils';

export default function App() {
  const [selectedLab] = useState<LabReport>(MOCK_LABS[0]);
  const [summary, setSummary] = useState<AISummary | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSummary = async (lab: LabReport) => {
    setLoading(true);
    try {
      const res = await fetch('/api/summarize-lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ labData: lab }),
      });
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary(selectedLab);
  }, [selectedLab]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-0 sm:p-12 font-sans text-slate-100 print:bg-white print:p-0">
      {/* Action Bar - Hidden on print */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center px-4 sm:px-0 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Zap className="text-black w-6 h-6 fill-black" />
          </div>
          <div>
            <span className="font-black text-2xl tracking-tighter uppercase italic">AlgoRx</span>
            <span className="block text-[8px] font-bold text-blue-400 tracking-[0.3em] uppercase ml-1">Performance Labs</span>
          </div>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <FileDown className="w-4 h-4" />
          Export Performance PDF
        </button>
      </div>

      {/* Main Report Document */}
      <div id="report-view" className="max-w-5xl mx-auto bg-white text-slate-950 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-none sm:rounded-[2.5rem] overflow-hidden print:shadow-none print:rounded-none">
        {/* Elite Header Area */}
        <div className="bg-[#050505] text-white p-10 sm:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12 items-start">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                <Activity className="w-3 h-3" />
                Optimization Protocol v4.2
              </div>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-tight italic uppercase">
                {selectedLab.name}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Athlete Profile</p>
                  <p className="text-xl font-bold italic tracking-tight">Hafsah Hussain</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lab Timestamp</p>
                  <p className="text-xl font-bold italic tracking-tight">{new Date(selectedLab.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-6">
              <div className="w-32 h-32 bg-white flex items-center justify-center rounded-3xl rotate-3 shadow-2xl">
                <Zap className="w-16 h-16 text-black fill-black" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Junction Verified</p>
                <div className="mt-2 px-4 py-2 bg-blue-600 rounded-lg text-xs font-black italic uppercase tracking-wider">Elite Tier</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 sm:p-16 space-y-16">
          {/* AI Intelligence Block - AlgoRx Style */}
          <div className="bg-[#F8FAFC] border-2 border-slate-100 rounded-[2rem] p-8 sm:p-12 space-y-8 relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-black rounded-2xl shadow-xl shadow-black/10">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tight">Clinician Insight Engine</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Algorithmic Peer Review • Gemini Flash 3.0</p>
              </div>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Running Clinical Simulation...</span>
              </div>
            ) : summary && (
              <div className="space-y-10">
                <p className="text-2xl font-serif italic text-slate-800 leading-snug max-w-4xl">
                  "{summary.summary}"
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-900 border-l-4 border-red-600 pl-4 uppercase tracking-[0.2em] flex items-center gap-2">
                      Sub-Optimal Clusters
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {summary.alerts.map((alert, i) => {
                        // Find the marker in selectedLab to determine color
                        const marker = selectedLab.markers.find(m => m.marker === alert.marker);
                        const isCritical = marker ? (marker.value < marker.min || marker.value > marker.max) : true;
                        
                        return (
                          <div key={i} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-slate-200 shadow-sm transition-hover hover:border-slate-300">
                            <div>
                              <p className="text-sm font-black italic uppercase tracking-tight text-slate-900">{alert.marker}</p>
                              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Baseline Delta Identified</p>
                            </div>
                            <div className="text-right">
                              <p className={cn(
                                "text-lg font-mono font-black italic",
                                isCritical ? "text-red-600" : "text-yellow-600"
                              )}>
                                {alert.value}
                              </p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase">Ref: {alert.range}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-900 border-l-4 border-blue-600 pl-4 uppercase tracking-[0.2em] flex items-center gap-2">
                      Optimization Vector
                    </h3>
                    <ul className="space-y-3">
                      {summary.recommendations.map((rec, i) => (
                        <li key={i} className="flex gap-4 p-4 bg-white/50 rounded-2xl border border-slate-100 items-start">
                          <span className="w-8 h-8 bg-slate-950 text-white rounded-xl flex items-center justify-center text-xs font-black shrink-0 shadow-lg">0{i+1}</span>
                          <p className="text-sm font-medium text-slate-700 leading-relaxed pt-1">{rec}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Marker Data Visualizer */}
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row items-end justify-between border-b-2 border-slate-100 pb-6 gap-4">
              <div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">Performance Matrix</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-referencing biological biomarkers against elite optimal ranges</p>
              </div>
            </div>

            {/* Legend Section */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-md bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">Elite Optimal</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">Peak performance target</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l sm:border-l-0 lg:border-l border-slate-200 pl-8 sm:pl-0 lg:pl-8">
                <div className="w-4 h-4 rounded-md bg-amber-400"></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">Sub-Optimal</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">Healthy but not optimized</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-slate-200 pl-8">
                <div className="w-4 h-4 rounded-md bg-red-500"></div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">Critical</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">Outside standard medical range</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20">
              {['Hormones', 'Lipids', 'Metabolic', 'Inflammation', 'Vitamins'].map(category => {
                const markers = selectedLab.markers.filter(m => m.category === category);
                if (markers.length === 0) return null;

                return (
                  <div key={category} className="space-y-10 group/cat">
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 flex items-center gap-4 before:h-px before:flex-1 before:bg-slate-100 after:h-px after:flex-1 after:bg-slate-100">
                      {category}
                    </h3>
                    <div className="space-y-14">
                      {markers.map(marker => {
                        const val = marker.value;
                        const min = marker.min;
                        const max = marker.max;
                        const oMin = marker.optimalMin || min + (max - min) * 0.3;
                        const oMax = marker.optimalMax || max - (max - min) * 0.3;
                        
                        // Determing Status
                        const isCritical = min === 0 ? (val < oMin || val > max) : (val < min || val > max);
                        const isSubOptimal = min === 0 ? (val >= oMin && val > oMax && val <= max) : (!isCritical && (val < oMin || val > oMax));
                        const isOptimal = !isCritical && !isSubOptimal;
                        
                        // Ensure the range always contains the value, with a generous buffer especially for values over the max
                        const isHighValue = val > max;
                        const rangeMax = isHighValue 
                          ? Math.max(max * 1.8, val * 1.4)
                          : Math.max(max * 1.5, val * 1.25);
                        const pMarker = (val / rangeMax) * 100;
                        const pMin = (min / rangeMax) * 100;
                        const pMax = (max / rangeMax) * 100;
                        const pOMin = (oMin / rangeMax) * 100;
                        const pOMax = (oMax / rangeMax) * 100;

                        // Color system
                        const colorRed = '#be1c1c';
                        const colorYellow = '#eab308';
                        const colorGreen = '#15803d';

                        const gradientBg = min === 0
                          ? `linear-gradient(to right, 
                              ${colorRed} 0%, 
                              ${colorRed} ${pOMin}%, 
                              ${colorGreen} ${pOMin}%, 
                              ${colorGreen} ${pOMax}%, 
                              ${colorYellow} ${pOMax}%, 
                              ${colorYellow} ${pMax}%, 
                              ${colorRed} ${pMax}%, 
                              ${colorRed} 100%)`
                          : `linear-gradient(to right, 
                              ${colorRed} 0%, 
                              ${colorRed} ${pMin}%, 
                              ${colorYellow} ${pMin}%, 
                              ${colorYellow} ${pOMin}%, 
                              ${colorGreen} ${pOMin}%, 
                              ${colorGreen} ${pOMax}%, 
                              ${colorYellow} ${pOMax}%, 
                              ${colorYellow} ${pMax}%, 
                              ${colorRed} ${pMax}%, 
                              ${colorRed} 100%)`;

                        return (
                          <div key={marker.marker} className="relative group">
                            <div className="flex justify-between items-end mb-6">
                              <div>
                                <h4 className="text-lg font-black italic uppercase tracking-tight text-slate-900">{marker.marker}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-black uppercase text-slate-500">Ref Range: {marker.range}</span>
                                  <span className="text-[9px] font-bold text-slate-400 uppercase">{marker.unit}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className={cn(
                                  "text-4xl font-mono font-black italic tracking-tighter",
                                  isCritical ? "text-red-700" :
                                  isSubOptimal ? "text-yellow-600" : "text-green-600"
                                )}>
                                  {marker.value}
                                </span>
                              </div>
                            </div>
                            
                            {/* Elite Multi-Zone Gradient Bar */}
                            <div className="space-y-4 pt-2">
                              <div className="relative w-full">
                                {/* Boundary Value Labels */}
                                <div className="flex justify-between text-[8px] font-bold text-slate-400 mb-1.5 px-0.5 tracking-tighter relative h-4">
                                  <span className="absolute left-0">0</span>
                                  {min !== 0 && <span style={{ position: 'absolute', left: `${pMin}%`, transform: 'translateX(-50%)' }}>{min}</span>}
                                  <span style={{ position: 'absolute', left: `${pOMin}%`, transform: 'translateX(-50%)' }} className="text-slate-500">{oMin}</span>
                                  <span style={{ position: 'absolute', left: `${pOMax}%`, transform: 'translateX(-50%)' }} className="text-slate-500">{oMax}</span>
                                  <span style={{ position: 'absolute', left: `${pMax}%`, transform: 'translateX(-50%)' }}>{max}</span>
                                  <span className="absolute right-0">{Math.round(rangeMax)}</span>
                                </div>
                                
                                {/* Relative wrapper for exact bar alignment */}
                                <div className="relative w-full">
                                  {/* The Gradient Bar */}
                                  <div 
                                    className="w-full h-10 rounded-2xl border border-slate-300 shadow-inner overflow-hidden relative"
                                    style={{
                                      background: gradientBg
                                    }}
                                  >
                                    {/* Zone Text Overlays - Black Text for contrast within bar */}
                                    <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
                                      <span className="text-[9px] font-black text-black/40 uppercase">Low</span>
                                      <span className="text-[9px] font-black text-black/50 uppercase tracking-[0.2em] italic">Elite Optimal Range</span>
                                      <span className="text-[9px] font-black text-black/40 uppercase">High</span>
                                    </div>

                                    {/* Reference Line Notches */}
                                    <div className="absolute inset-0 pointer-events-none">
                                      <div className="absolute top-0 bottom-0 w-px bg-black/10" style={{ left: `${pMin}%` }} />
                                      <div className="absolute top-0 bottom-0 w-px bg-black/10" style={{ left: `${pOMin}%` }} />
                                      <div className="absolute top-0 bottom-0 w-px bg-black/10" style={{ left: `${pOMax}%` }} />
                                      <div className="absolute top-0 bottom-0 w-px bg-black/10" style={{ left: `${pMax}%` }} />
                                    </div>
                                  </div>

                                  {/* Current Value Pointer - Positions beautifully without overlapping the inner bar text */}
                                  <motion.div 
                                    initial={{ left: 0 }}
                                    animate={{ left: `${Math.min(97.5, pMarker)}%` }}
                                    className="absolute top-0 bottom-0 transition-all flex flex-col items-center z-20 pointer-events-none"
                                    style={{ transform: 'translateX(-50%)' }}
                                  >
                                    {/* Vertical indicator line (Goes cleanly through the bar, 40px height) */}
                                    <div className="w-1.5 h-10 bg-slate-950 shadow-sm shrink-0" />
                                    {/* Vertical stick below the bar (12px height) */}
                                    <div className="w-1.5 bg-slate-950 h-3 shadow-sm shrink-0" />
                                    {/* Floating white circular dot - sits directly below the bar range */}
                                    <div className="w-5 h-5 bg-white border-[3.5px] border-slate-950 rounded-full shadow-md shrink-0 -mt-1.5 z-30 pointer-events-auto" />
                                    
                                    {/* Value Display Badge */}
                                    <div className="mt-2 px-3 py-1.5 bg-slate-950 rounded-xl text-[11px] font-black text-white shadow-2xl whitespace-nowrap uppercase italic tracking-widest border border-slate-800 flex items-center gap-1.5 z-30 pointer-events-auto">
                                      <span className={cn(
                                        "w-2 h-2 rounded-full shrink-0 animate-pulse",
                                        isCritical ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                                        isSubOptimal ? "bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.5)]" : "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                                      )} />
                                      <span>{val} {marker.unit}</span>
                                    </div>
                                  </motion.div>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between mt-28 px-1">
                              <div className="flex items-center gap-1.5">
                                <span className={cn(
                                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em]",
                                  isCritical ? "bg-red-600 text-white" :
                                  isSubOptimal ? "bg-yellow-100 text-yellow-800 border border-yellow-300" : "bg-green-100 text-green-800 border border-green-300"
                                )}>
                                  {isCritical ? "CRITICAL OUT OF RANGE" : 
                                   isSubOptimal ? "SUB-OPTIMAL" : "HEALTHY (ELITE)"}
                                </span>
                              </div>
                              <div className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em]">Marker ID: {marker.marker.substring(0,3).toUpperCase()}-{Math.round(val*11)}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Epic Footer Area */}
          <div className="pt-24 pb-4 border-t-2 border-slate-50 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-8">
              <Zap className="w-12 h-12 text-slate-100 fill-slate-100" />
            </div>

            <p className="text-[9px] text-slate-400 text-center uppercase tracking-widest leading-relaxed max-w-2xl mx-auto opacity-60">
              ALGORX SYSTEMS IS NOT A CLINICAL PRACTICE. INSIGHTS PROVIDED VIA THE GEN AI PIPELINE ARE ADVISORY ONLY. 
              ALWAYS CROSS-REFERENCE WITH A MEDICAL PROFESSIONAL BEFORE ALTERING INTERVENTIONS.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;700;900&display=swap');
        
        body {
          font-family: 'Public Sans', sans-serif;
        }

        #report-view {
          min-height: 1000px;
        }

        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          body {
            background: white !important;
            padding: 0 !important;
          }
          #report-view {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
            border-radius: 0 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          /* Ensure colors print correctly */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
