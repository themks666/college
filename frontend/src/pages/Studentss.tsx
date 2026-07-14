import { useState } from "react";
import { 
  Search, UserPlus, GraduationCap, Mail, 
  Phone, MapPin, Filter, ChevronRight, 
  Layers 
} from "lucide-react";

interface IStudentLog {
  id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  batch: string;
  faculty: string; // Updated from section to faculty
  email: string;
  phone: string;
  city: string;
  bloodGroup: string;
}

const MOCK_STUDENTS: IStudentLog[] = [
  {
    id: "65a1b2c3d4e5f6g7h8i90123",
    firstName: "Aarav",
    lastName: "Sharma",
    rollNumber: "INF-401",
    batch: "Batch-2026",
    faculty: "Information Technology",
    email: "aarav.sharma@educluster.edu",
    phone: "9851012345",
    city: "Kathmandu",
    bloodGroup: "O+"
  },
  {
    id: "65a1b2c3d4e5f6g7h8i90124",
    firstName: "Elena",
    lastName: "Rai",
    rollNumber: "ENG-204",
    batch: "Batch-2026",
    faculty: "Software Engineering",
    email: "elena.rai@educluster.edu",
    phone: "9841987654",
    city: "Lalitpur",
    bloodGroup: "A-"
  },
  {
    id: "65a1b2c3d4e5f6g7h8i90125",
    firstName: "Rohan",
    lastName: "Shrestha",
    rollNumber: "BBA-709",
    batch: "Batch-2025",
    faculty: "Business Administration",
    email: "rohan.shrestha@educluster.edu",
    phone: "9803112233",
    city: "Pokhara",
    bloodGroup: "B+"
  }
];

const StudentDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");

  // Filter Pipeline Logic
  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = 
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFaculty = selectedFaculty === "All" || student.faculty === selectedFaculty;

    return matchesSearch && matchesFaculty;
  });

  // Extract unique faculties dynamically for the selection pool
  const facultyOptions = ["All", ...Array.from(new Set(MOCK_STUDENTS.map(s => s.faculty)))];

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/50 p-6 md:p-8 flex flex-col items-center justify-start">
      <div className="max-w-6xl w-full space-y-6">
        
        {/* 🗂️ Header Toolbar Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border-l-4 border-l-emerald-600 border-y border-r border-slate-300 rounded-2xl p-5 shadow-sm">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">
              Active Logs
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Student Registry Pipeline</h1>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-emerald-600 border border-emerald-700 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-600/10 transition-all self-stretch sm:self-auto justify-center">
            <UserPlus className="w-4 h-4" /> Provision Student
          </button>
        </div>

        {/* 🔍 Search and Faculty Filters Section */}
        <div className="bg-white border border-slate-300 rounded-2xl p-4 shadow-md shadow-slate-200/40 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Query by system index name or validation sequence (e.g., INF-401)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative w-full">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <select 
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border-2 border-slate-300 bg-slate-50/30 focus:outline-none focus:border-emerald-600 transition-all text-slate-700 appearance-none"
              >
                {facultyOptions.map((fac) => (
                  <option key={fac} value={fac}>
                    {fac === "All" ? "All Faculties" : fac}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 📋 Directory Registry List */}
        <div className="bg-white border border-slate-300 rounded-2xl shadow-md shadow-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider">
                  <th className="py-3 px-5">Student Identity</th>
                  <th className="py-3 px-4">Academic Pointer</th>
                  <th className="py-3 px-4">Network Coordinates</th>
                  <th className="py-3 px-4">Logistics</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                      
                      {/* Identity Details */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-300 text-slate-700 font-extrabold flex items-center justify-center text-xs group-hover:border-emerald-500 transition-all">
                            {student.firstName[0]}{student.lastName[0]}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {student.firstName} {student.lastName}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono select-all block mt-0.5">
                              {student.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Academics Pointer & Faculty Allocation */}
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold border-2 border-slate-300 bg-white text-slate-700 rounded-lg">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                          {student.rollNumber}
                        </div>
                        <div className="text-xs font-bold text-emerald-700 mt-1 pl-1 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-emerald-600" />
                          {student.faculty}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium pl-4">
                          {student.batch}
                        </div>
                      </td>

                      {/* Communications */}
                      <td className="py-4 px-4 space-y-1">
                        <a href={`mailto:${student.email}`} className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-600 transition-colors">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {student.email}
                        </a>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {student.phone}
                        </div>
                      </td>

                      {/* Logistics Info */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {student.city}
                        </div>
                        <span className="inline-block mt-1 text-[10px] font-extrabold px-1.5 py-0.2 border border-rose-200 bg-rose-50 text-rose-700 rounded">
                          Blood: {student.bloodGroup}
                        </span>
                      </td>

                      {/* Action Triggers */}
                      <td className="py-4 px-5 text-right">
                        <button className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold border-2 border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 bg-white rounded-xl transition-all shadow-sm">
                          Inspect <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                      No records found inside the specified faculty search scope.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDirectory;