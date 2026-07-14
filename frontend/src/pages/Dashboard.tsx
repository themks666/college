
import { 
  Users, UserCheck, BookOpenCheck, TrendingUp, 
  ArrowUpRight, ArrowDownRight, MoreVertical, Plus, 
  ArrowRight
} from "lucide-react";

export default function DashboardOverview({ onNavigateToRegister }: { onNavigateToRegister: () => void }) {

  const metrics = [
    { title: "Total Students", value: "12,480", change: "+4.2%", positive: true, icon: Users, delay: "delay-75" },
    { title: "Active Attendance", value: "94.8%", change: "-0.6%", positive: false, icon: UserCheck, delay: "delay-100" },
    { title: "Course Subscriptions", value: "48", change: "+12.5%", positive: true, icon: BookOpenCheck, delay: "delay-150" },
    { title: "Retention Rate", value: "99.1%", change: "+0.3%", positive: true, icon: TrendingUp, delay: "delay-200" },
  ];

  const recentRegistrations = [
    { id: "INF-401", name: "Aria Vance", batch: "Cohort 2026", time: "3 mins ago", status: "Processed" },
    { id: "INF-402", name: "Kaelen Hayes", batch: "Cohort 2026", time: "14 mins ago", status: "Processed" },
    { id: "BIO-109", name: "Elena Rostova", batch: "MedTech v2", time: "1 hour ago", status: "Pending Verification" },
    { id: "SWE-882", name: "Marcus Chen", batch: "DevOps Core", time: "2 hours ago", status: "Processed" },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
      
      {/* 👋 Top Header Greeting Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Workspace</h1>
          <p className="text-sm text-slate-500 mt-1">Institutional record indexes are optimized and fully synced.</p>
        </div>
        
        {/* Quick Action Node */}
        <button 
          onClick={onNavigateToRegister}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/10 transition duration-200 transform active:scale-98 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Enroll New Student
        </button>
      </div>

      {/* 📊 Core Metric Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up ${card.delay}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.title}</span>
                <div className="p-2.5 bg-slate-50 rounded-xl text-slate-600 border border-slate-100">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800 tracking-tight">{card.value}</span>
                <span className={`inline-flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md ${
                  card.positive ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"
                }`}>
                  {card.positive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                  {card.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📉 Main Segment Split: Activity Tracker vs Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Performance Visualizer Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 flex flex-col justify-between animate-slide-up delay-150">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800">Operational Log Performance</h3>
              <p className="text-xs text-slate-400 mt-0.5">Registration transaction trends relative to batch allocations.</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Graphical Mock Grid Plotter */}
          <div className="h-64 flex items-end gap-3 px-2 border-b border-l border-slate-100 relative pt-4">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pl-6 text-[10px] text-slate-300">
              <div className="border-t border-dashed border-slate-100 w-full pt-1">200 entries</div>
              <div className="border-t border-dashed border-slate-100 w-full pt-1">100 entries</div>
              <div className="border-t border-dashed border-slate-100 w-full pt-1">0 entries</div>
            </div>
            {/* Visualizer bars */}
            {[45, 60, 35, 75, 90, 65, 85, 95, 50, 70, 110, 130].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer z-10">
                <div 
                  className="w-full bg-linear-to-t from-emerald-500 to-teal-500 rounded-t-md group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300"
                  style={{ height: `${(val / 150) * 100}%` }}
                />
                <span className="text-[9px] text-slate-400 mt-2 scale-90 hidden sm:block">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Process Execution Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 flex flex-col justify-between animate-slide-up delay-200">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-800">Recent Roll-Calls</h3>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Live Stream</span>
            </div>

            <div className="divide-y divide-slate-100">
              {recentRegistrations.map((student) => (
                <div key={student.id} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0 group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 group-hover:border-emerald-200 group-hover:bg-emerald-50/30 transition">
                      {student.id.split("-")[0]}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold text-slate-800 truncate">{student.name}</p>
                      <p className="text-xs text-slate-400 truncate">{student.batch} • {student.time}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                    student.status === "Processed" ? "bg-slate-100 text-slate-600" : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>
                    {student.status === "Processed" ? "Active" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={onNavigateToRegister}
            className="w-full mt-5 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition"
          >
            Review Audit History <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}