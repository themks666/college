import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  User, School, Lock, MapPin, HeartPulse, 
  ArrowRight, ArrowLeft, ShieldCheck,
  Sparkles, Info, Phone
} from "lucide-react";

interface IStudentFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rollNumber: string;
  batch: string;
  currentSemester?: string;
  section: string;
  address: { street?: string; city?: string; state?: string; postalCode?: string; country: string; };
  contact: { phone?: string; };
  medicalInfo: { bloodGroup?: string; };
  gender: string;
  dateOfBirth: string;
}

const Home = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<IStudentFormInput>({
    defaultValues: {
      address: { country: "Nepal" },
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["rollNumber", "batch", "section"];
    if (step === 2) fieldsToValidate = ["firstName", "lastName", "gender", "dateOfBirth"];
    if (step === 3) fieldsToValidate = ["email", "password"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data: IStudentFormInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Data submitted successfully:", data);
    setStep(5);
  };

  const stepItems = [
    { id: 1, title: "Academics", icon: School },
    { id: 2, title: "Identity", icon: User },
    { id: 3, title: "Security", icon: Lock },
    { id: 4, title: "Logistics", icon: HeartPulse },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/50 p-6 md:p-8 flex flex-col justify-start items-center">
      <div className="max-w-3xl w-full space-y-6">
        
        {/* 🧭 Top Stepper Navigation (Sharper borders & left-side decorative indicator) */}
        {step <= totalSteps && (
          <div className="bg-white border-l-4 border-l-emerald-600 border-y border-r border-slate-300 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between relative max-w-xl mx-auto">
              {stepItems.map((s, index) => {
                const Icon = s.icon;
                const isCurrent = step === s.id;
                const isPassed = step > s.id;

                return (
                  <div key={s.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                        isCurrent 
                          ? "bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-700 text-white shadow-md shadow-emerald-600/20 scale-105" 
                          : isPassed 
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-bold" 
                          : "bg-slate-50 border-slate-300 text-slate-500"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-xs font-bold hidden sm:inline ${isCurrent ? "text-slate-900" : "text-slate-500"}`}>
                        {s.title}
                      </span>
                    </div>
                    
                    {index < stepItems.length - 1 && (
                      <div className={`h-[2px] grow mx-4 rounded transition-all duration-500 ${isPassed ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-slate-300"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 📄 Main Content Card (Stronger outer border contour) */}
        <div className="bg-white border border-slate-300 rounded-2xl shadow-md shadow-slate-200/60 overflow-hidden">
          <form 
            onSubmit={(e) => {
              if (step < totalSteps) {
                e.preventDefault();
                nextStep();
              } else {
                handleSubmit(onSubmit)(e);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && step < totalSteps) {
                e.preventDefault();
              }
            }}
            className="p-6 md:p-8 space-y-6"
          >
            
            {step <= totalSteps && (
              <div className="border-b border-slate-200 pb-4">
                <span className="text-[10px] font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">Step {step} of {totalSteps}</span>
                <h2 className="text-lg font-bold text-slate-900 mt-2">{stepItems[step - 1].title} Pipeline Configuration</h2>
              </div>
            )}

            {/* STEP 1: ACADEMICS (Deepened inputs with clear outline boundaries) */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in max-w-2xl">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Roll Number <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    {...register("rollNumber", { required: "Required" })}
                    placeholder="e.g. INF-401"
                    className={`w-full px-3.5 py-2 text-sm rounded-lg border-2 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 ${
                      errors.rollNumber ? "border-red-400 bg-red-50/40" : "border-slate-300 bg-slate-50/30"
                    }`}
                  />
                  {errors.rollNumber && <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1"><Info className="w-3 h-3" /> {errors.rollNumber.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Batch ID Reference <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    {...register("batch", { required: "Required" })}
                    placeholder="Mongoose Identifier"
                    className={`w-full px-3.5 py-2 text-sm rounded-lg border-2 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 ${
                      errors.batch ? "border-red-400 bg-red-50/40" : "border-slate-300 bg-slate-50/30"
                    }`}
                  />
                  {errors.batch && <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1"><Info className="w-3 h-3" /> {errors.batch.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Assigned Section <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    {...register("section", { required: "Required" })}
                    placeholder="e.g. A"
                    className={`w-full px-3.5 py-2 text-sm uppercase rounded-lg border-2 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 ${
                      errors.section ? "border-red-400 bg-red-50/40" : "border-slate-300 bg-slate-50/30"
                    }`}
                  />
                  {errors.section && <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1"><Info className="w-3 h-3" /> {errors.section.message}</p>}
                </div>
              </div>
            )}

            {/* STEP 2: PROFILE PROFILE */}
            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in max-w-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">First Name *</label>
                  <input
                    type="text"
                    {...register("firstName", { required: true })}
                    placeholder="John"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Last Name *</label>
                  <input
                    type="text"
                    {...register("lastName", { required: true })}
                    placeholder="Doe"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Gender *</label>
                  <select
                    {...register("gender", { required: true })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600"
                  >
                    <option value="">Select Option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Date of Birth *</label>
                  <input
                    type="date"
                    {...register("dateOfBirth", { required: true })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: SECURITY */}
            {step === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fade-in max-w-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Primary Email *</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="johndoe@institution.edu"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Access Password *</label>
                  <input
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: LOGISTICS */}
            {step === 4 && (
              <div className="space-y-5 animate-fade-in max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-100/60 p-4 rounded-xl border border-slate-300">
                  <div>
                    <label className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1"><HeartPulse className="w-3.5 h-3.5 text-rose-600" /> Blood Registry</label>
                    <select {...register("medicalInfo.bloodGroup")} className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 bg-white focus:border-emerald-600">
                      <option value="">Undisclosed</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-emerald-700" /> Phone Contact</label>
                    <input type="text" {...register("contact.phone")} placeholder="98XXXXXXXX" className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 bg-white focus:border-emerald-600" />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> Physical Address Coordinates
                  </span>
                  <input type="text" {...register("address.street")} placeholder="Street Address Lane" className="w-full px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:border-emerald-600" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" {...register("address.city")} placeholder="City" className="px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:border-emerald-600" />
                    <input type="text" {...register("address.postalCode")} placeholder="Postal Code" className="px-3.5 py-2 text-sm rounded-lg border-2 border-slate-300 bg-slate-50/30 focus:border-emerald-600" />
                  </div>
                </div>
              </div>
            )}

            {/* SUCCESS SCREEN */}
            {step === 5 && (
              <div className="text-center py-8 space-y-4 animate-scale-up flex flex-col items-center justify-center">
                <div className="inline-flex p-4 bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-full shadow-inner">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Registration Finalized</h2>
                <p className="text-slate-600 text-sm max-w-sm mx-auto">
                  Model documents successfully processed and added to the cluster network pipeline.
                </p>
                <button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  className="px-5 py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl border border-slate-800 shadow-sm transition-all"
                >
                  Create Alternative Record
                </button>
              </div>
            )}

            {/* 🔘 Navigation Action Bar */}
            {step <= totalSteps && (
              <div className="flex items-center justify-between pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 border border-transparent hover:border-slate-300 hover:bg-slate-50 rounded-xl disabled:opacity-0 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-emerald-600 border border-emerald-700 hover:bg-emerald-700 text-white rounded-xl shadow-md transition"
                  >
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border border-emerald-700 rounded-xl shadow-md disabled:opacity-50 transition"
                  >
                    {isSubmitting ? "Processing..." : <>Complete Registration <Sparkles className="w-3.5 h-3.5" /></>}
                  </button>
                )}
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;