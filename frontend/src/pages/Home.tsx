import  { useState } from 'react';

export default function OnboardInstitution() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Single state holding both payloads for our endpoint
  const [formData, setFormData] = useState({
    // Step 1: Institution Info
    schoolName: '',
    shortName: '',
    schoolEmail: '',
    schoolPhone: '',
    
    // Step 2: Main Admin Info
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminPassword: '',
    adminEmployeeId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    // Validate Step 1 before moving forward
    if (!formData.schoolName || !formData.shortName || !formData.schoolEmail) {
      setMessage({ type: 'error', text: 'Please fill in all required institution fields.' });
      return;
    }
    setMessage({ type: '', text: '' });
    setStep(2);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/v1/superadmin/onboard-institution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // SuperAdmin JWT
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Institution and Main Admin successfully onboarded!' });
        // Reset form
        setFormData({
          schoolName: '', shortName: '', schoolEmail: '', schoolPhone: '',
          adminFirstName: '', adminLastName: '', adminEmail: '', adminPassword: '', adminEmployeeId: ''
        });
        setStep(1);
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Onboard New Institution</h2>
        <p className="text-sm text-gray-500 mt-1">Initialize a new school instance and assign its root administrator.</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors duration-200 ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-green-100 text-green-700'}`}>
            {step > 1 ? '✓' : '1'}
          </span>
          <span className={`text-sm font-medium ${step === 1 ? 'text-gray-900' : 'text-gray-500'}`}>Institution Details</span>
        </div>
        <div className="flex-1 h-[2px] mx-4 bg-gray-100"></div>
        <div className="flex items-center gap-3">
          <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold border transition-colors duration-200 ${step === 2 ? 'bg-indigo-600 text-white border-transparent' : 'bg-white border-gray-300 text-gray-500'}`}>
            2
          </span>
          <span className={`text-sm font-medium ${step === 2 ? 'text-gray-900' : 'text-gray-500'}`}>Primary Admin Account</span>
        </div>
      </div>

      {/* Alert Banner */}
      {message.text && (
        <div className={`p-4 mb-6 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      {/* Step 1: Institution Information Form */}
      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Institution Name *</label>
              <input type="text" name="schoolName" required value={formData.schoolName} onChange={handleChange} placeholder="Purbanchal University" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Short Name / Code *</label>
              <input type="text" name="shortName" required value={formData.shortName} onChange={handleChange} placeholder="pu" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all lowercase" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Official Email *</label>
              <input type="email" name="schoolEmail" required value={formData.schoolEmail} onChange={handleChange} placeholder="info@purbanchal.edu.np" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Contact Phone</label>
              <input type="text" name="schoolPhone" value={formData.schoolPhone} onChange={handleChange} placeholder="+977 1234567" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all text-sm flex items-center gap-2">
              Next Step: Setup Admin →
            </button>
          </div>
        </form>
      )}

      {/* Step 2: Main Admin Configuration Form */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Admin First Name *</label>
              <input type="text" name="adminFirstName" required value={formData.adminFirstName} onChange={handleChange} placeholder="Ram" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Admin Last Name *</label>
              <input type="text" name="adminLastName" required value={formData.adminLastName} onChange={handleChange} placeholder="Prasad" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Admin Professional Email *</label>
              <input type="email" name="adminEmail" required value={formData.adminEmail} onChange={handleChange} placeholder="ram.admin@purbanchal.edu.np" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Admin Employee ID *</label>
              <input type="text" name="adminEmployeeId" required value={formData.adminEmployeeId} onChange={handleChange} placeholder="EMP-PU-001" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Admin Login Password *</label>
              <input type="password" name="adminPassword" required minLength={8} value={formData.adminPassword} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <button type="button" onClick={() => setStep(1)} className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-sm transition-all">
              ← Back to School
            </button>
            <button type="submit" disabled={loading} className={`px-6 py-2.5 text-white font-medium rounded-lg text-sm shadow-sm transition-all flex items-center gap-2 ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
              {loading ? 'Onboarding School...' : 'Complete Onboarding & Deploy ✓'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}