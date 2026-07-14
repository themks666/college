import { useState } from "react";
import { 
  Shield,  Database, 
  Save, Key, CheckCircle, RefreshCw, 
   School 
} from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate pipeline config update
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: "general", title: "Institution Parameters", icon: School },
    { id: "security", title: "Access & Security", icon: Shield },
    { id: "database", title: "Cluster Sync", icon: Database },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-linear-to-br from-slate-50 via-emerald-50/40 to-teal-50/50 p-6 md:p-8 flex flex-col items-center justify-start">
      <div className="max-w-5xl w-full space-y-6">
        
        {/* 🗂️ Header Toolbar Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border-l-4 border-l-emerald-600 border-y border-r border-slate-300 rounded-2xl p-5 shadow-sm">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">
              System Control
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Global Workspace Settings</h1>
          </div>
        </div>

        {/* 🎛️ Settings Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          
          {/* Left Side Navigation Panels */}
          <div className="md:col-span-1 bg-white border border-slate-300 rounded-2xl p-3 shadow-md shadow-slate-200/40 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all text-left ${
                    isActive
                      ? "bg-linear-to-br from-emerald-600 to-teal-600 border-emerald-700 text-white shadow-sm"
                      : "bg-transparent border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.title}
                </button>
              );
            })}
          </div>

          {/* Right Side Settings Dashboard Container */}
          <div className="md:col-span-3 bg-white border border-slate-300 rounded-2xl shadow-md shadow-slate-200/60 overflow-hidden">
            <form onSubmit={handleSave} className="p-6 md:p-8 space-y-6">
              
              {/* TAB 1: GENERAL INSTITUTION CONFIGS */}
              {activeTab === "general" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-sm font-bold text-slate-900">Institution Metadata Routing</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Configure root parameters displayed across directory outputs.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">Campus Cluster Identifier</label>
                      <input 
                        type="text" 
                        defaultValue="Central Hub - Kathmandu Cluster" 
                        className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:border-emerald-600 text-slate-800" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">Academic Calendar Cycle</label>
                      <select className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:border-emerald-600 text-slate-700 font-medium">
                        <option>Fall / Spring Bi-Semester</option>
                        <option>Trimester Sequence</option>
                        <option>Annual Static Loop</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">Primary Localization Currency</label>
                      <input 
                        type="text" 
                        defaultValue="NPR (Rs.)" 
                        className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:border-emerald-600 text-slate-800" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ACCESS & SECURITY */}
              {activeTab === "security" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-sm font-bold text-slate-900">Cryptographic Identity Access</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Control API keys, multi-step validations, and registry rules.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between p-4 bg-slate-50 border border-slate-300 rounded-xl">
                      <div className="space-y-0.5 max-w-[85%]">
                        <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Key className="w-3.5 h-3.5 text-emerald-600" /> Force Multi-Factor Auth (MFA)
                        </label>
                        <p className="text-[11px] text-slate-500">Require all administrative credentials to provide secondary validation tags during sign-in.</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 mt-1" />
                    </div>

                    <div className="flex items-start justify-between p-4 bg-slate-50 border border-slate-300 rounded-xl">
                      <div className="space-y-0.5 max-w-[85%]">
                        <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          Strict Faculty Bounds
                        </label>
                        <p className="text-[11px] text-slate-500">Restrict access nodes so operators can only look at entries within their assigned faculty parameters.</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 mt-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DATABASE SYNC */}
              {activeTab === "database" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-sm font-bold text-slate-900">Dynamic Storage & Purging</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage pipeline latency metrics and automatic cluster backups.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">Data Auto-Backup Frequency</label>
                      <select className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:border-emerald-600 text-slate-700">
                        <option>Every 6 Hours (Delta Updates)</option>
                        <option>Daily at 00:00 UTC</option>
                        <option>Weekly Maintenance Sync</option>
                      </select>
                    </div>

                    <div className="p-4 bg-amber-50/50 border border-amber-300 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> Index Optimization Sequence
                      </h4>
                      <p className="text-[11px] text-amber-700 leading-relaxed">
                        Re-building your document indices speeds up lookups on the student registry page, but it might briefly slow down form submission workflows.
                      </p>
                      <button type="button" className="px-3 py-1.5 bg-white hover:bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold rounded-lg transition-all shadow-sm">
                        Trigger Optimization Pipeline
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 🔘 Settings Form Action Bar */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  {saveSuccess && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg animate-fade-in">
                      <CheckCircle className="w-3.5 h-3.5" /> Core Config Saved Successfully
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-emerald-600 border border-emerald-700 hover:bg-emerald-700 text-white rounded-xl shadow-md disabled:opacity-50 transition-all ml-auto"
                >
                  <Save className="w-3.5 h-3.5" /> 
                  {isSaving ? "Syncing..." : "Apply Changes"}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SettingsPage;