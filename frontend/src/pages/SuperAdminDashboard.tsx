import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function InstitutionDetails() {
  const { id } = useParams(); // Fetches institution ID from routing params
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Real-world scenario state
  const [institution, setInstitution] = useState({
    name: "Purbanchal University",
    shortName: "pu",
    email: "info@purbanchal.edu.np",
    phone: "+977 1234567",
    status: "Active",
    admin: {
      name: "Ram Prasad",
      email: "ram.admin@purbanchal.edu.np",
      employeeId: "EMP-PU-001"
    },
    metrics: {
      departments: 0,
      lecturers: 1, // The newly created admin
      students: 0
    },
    features: {
      lms: true,
      examModule: false,
      smsNotifications: true,
      storageLimitGb: "50"
    }
  });

  // Display success banner if redirected from the onboarding wizard
  const [showSuccessToast, setShowSuccessToast] = useState(
    location.state?.justCreated || false
  );

  const handleToggleFeature = (featureKey:any) => {
    setInstitution({
      ...institution,
      features: {
        ...institution.features,
        [featureKey]: !institution.features[featureKey]
      }
    });
  };

  const handleStatusChange = (e:any) => {
    setInstitution({ ...institution, status: e.target.value });
  };

  const handleCopyInvite = () => {
    const inviteTemplate = `
🏫 Welcome to the Platform!

Your institution "${institution.name}" has been successfully provisioned.

🔑 Admin Login Credentials:
- Portal URL: https://${institution.shortName}.yourplatform.edu
- Admin Email: ${institution.admin.email}
- Employee ID: ${institution.admin.employeeId}

*Please use the password configured during setup to log in. You will be prompted to set up your faculties and departments upon your first login.*
    `.trim();

    navigator.clipboard.writeText(inviteTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSaveChanges = async () => {
    setSaveLoading(true);
    // Simulate API patch request to save feature flags and status
    setTimeout(() => {
      setSaveLoading(false);
      alert("System configurations updated successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Dynamic Toast: Shows only right after creation */}
      {showSuccessToast && (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold">✓</span>
            <div>
              <p className="font-semibold text-sm">Deployment Successful!</p>
              <p className="text-xs text-green-700">Database instances isolated, and primary administrator created.</p>
            </div>
          </div>
          <button onClick={() => setShowSuccessToast(false)} className="text-green-800 hover:text-green-950 text-xs font-semibold">Dismiss</button>
        </div>
      )}

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-950">{institution.name}</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${institution.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {institution.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">ID: <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-xs">{id || "inst_6f8c9b2"}</code> • Domain Code: <strong className="text-gray-700 font-mono text-xs">{institution.shortName}</strong></p>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={institution.status} 
            onChange={handleStatusChange}
            className="px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Active">Active / Live</option>
            <option value="Maintenance">Maintenance Mode</option>
            <option value="Suspended">Suspend Tenant</option>
          </select>
          <button 
            onClick={handleSaveChanges}
            disabled={saveLoading}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm shadow-sm transition-all"
          >
            {saveLoading ? 'Saving...' : 'Save Config'}
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Admin Credentials & System Metrics */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section: Invitation Credentials */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-xs space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Administrator Handover Kit</h2>
              <p className="text-xs text-gray-500">Provide these credentials to the local administrator so they can configure their faculty settings.</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs text-gray-700 space-y-2">
              <p><span className="text-gray-400"># Portal Login:</span> <span className="text-indigo-600 underline">https://{institution.shortName}.yourplatform.edu</span></p>
              <p><span className="text-gray-400"># Admin Email:</span> {institution.admin.email}</p>
              <p><span className="text-gray-400"># Employee ID:</span> {institution.admin.employeeId}</p>
            </div>

            <button 
              onClick={handleCopyInvite}
              className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-600 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
            >
              {copied ? '✓ Copied Invitation Details!' : 'Copy Invitation Message'}
            </button>
          </div>

          {/* Section: Live System Usage Metrics */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Database Records Usage</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg text-center">
                <span className="text-2xl font-bold text-gray-900">{institution.metrics.departments}</span>
                <p className="text-xs text-gray-500 mt-1 uppercase font-semibold tracking-wider">Departments</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg text-center">
                <span className="text-2xl font-bold text-gray-900">{institution.metrics.lecturers}</span>
                <p className="text-xs text-gray-500 mt-1 uppercase font-semibold tracking-wider">Lecturers</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg text-center">
                <span className="text-2xl font-bold text-gray-900">{institution.metrics.students}</span>
                <p className="text-xs text-gray-500 mt-1 uppercase font-semibold tracking-wider">Students</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Feature Flags / Settings */}
        <div className="space-y-6">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Tenant Custom Modules</h2>
              <p className="text-xs text-gray-500">Toggle premium features for this institution.</p>
            </div>

            <div className="space-y-4">
              {/* LMS Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Learning Management (LMS)</p>
                  <p className="text-xs text-gray-400">Classrooms, notes, lecture notes</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={institution.features.lms}
                  onChange={() => handleToggleFeature('lms')}
                  className="w-9 h-5 bg-gray-200 rounded-full appearance-none checked:bg-indigo-600 transition-colors cursor-pointer relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all checked:after:translate-x-4" 
                />
              </div>

              {/* Exam Module Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Exams & Grading</p>
                  <p className="text-xs text-gray-400">Automated CGPA & report cards</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={institution.features.examModule}
                  onChange={() => handleToggleFeature('examModule')}
                  className="w-9 h-5 bg-gray-200 rounded-full appearance-none checked:bg-indigo-600 transition-colors cursor-pointer relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all checked:after:translate-x-4" 
                />
              </div>

              {/* SMS Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">SMS Notifications</p>
                  <p className="text-xs text-gray-400">Direct-to-phone parent alerts</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={institution.features.smsNotifications}
                  onChange={() => handleToggleFeature('smsNotifications')}
                  className="w-9 h-5 bg-gray-200 rounded-full appearance-none checked:bg-indigo-600 transition-colors cursor-pointer relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all checked:after:translate-x-4" 
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Assigned Storage Limit</label>
                <select 
                  value={institution.features.storageLimitGb}
                  onChange={(e) => setInstitution({
                    ...institution,
                    features: { ...institution.features, storageLimitGb: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                >
                  <option value="10">10 GB (Standard)</option>
                  <option value="50">50 GB (Medium)</option>
                  <option value="200">200 GB (Enterprise)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}