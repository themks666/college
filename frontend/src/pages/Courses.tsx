import { useState } from "react";
import { 
  Search, BookOpen, Layers, Clock, 
  Users, Plus, Filter, ChevronRight, 
  CheckCircle2, AlertCircle 
} from "lucide-react";

interface ICourseLog {
  id: string;
  courseCode: string;
  title: string;
  faculty: string;
  creditHours: number;
  enrolledStudents: number;
  maxCapacity: number;
  status: "Active" | "Syllabus Review";
}

const MOCK_COURSES: ICourseLog[] = [
  {
    id: "crs-65a1b2c3d001",
    courseCode: "IT-302",
    title: "Distributed Systems & Cloud Architecture",
    faculty: "Information Technology",
    creditHours: 4,
    enrolledStudents: 42,
    maxCapacity: 50,
    status: "Active"
  },
  {
    id: "crs-65a1b2c3d002",
    courseCode: "SE-404",
    title: "Advanced Software Engineering Principles",
    faculty: "Software Engineering",
    creditHours: 3,
    enrolledStudents: 48,
    maxCapacity: 48,
    status: "Active"
  },
  {
    id: "crs-65a1b2c3d003",
    courseCode: "BBA-210",
    title: "Organizational Behavior & Dynamics",
    faculty: "Business Administration",
    creditHours: 3,
    enrolledStudents: 15,
    maxCapacity: 60,
    status: "Syllabus Review"
  }
];

const CourseDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");

  // Filter Logic Pipeline
  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFaculty = selectedFaculty === "All" || course.faculty === selectedFaculty;

    return matchesSearch && matchesFaculty;
  });

  const facultyOptions = ["All", ...Array.from(new Set(MOCK_COURSES.map(c => c.faculty)))];

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-linear-to-br from-slate-50 via-emerald-50/40 to-teal-50/50 p-6 md:p-8 flex flex-col items-center justify-start">
      <div className="max-w-6xl w-full space-y-6">
        
        {/* 🗂️ Header Toolbar Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border-l-4 border-l-emerald-600 border-y border-r border-slate-300 rounded-2xl p-5 shadow-sm">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">
              Syllabus Index
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Course Curriculum Pipeline</h1>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-emerald-600 border border-emerald-700 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-600/10 transition-all self-stretch sm:self-auto justify-center">
            <Plus className="w-4 h-4" /> Provision New Course
          </button>
        </div>

        {/* 🔍 Search and Faculty Filters Section */}
        <div className="bg-white border border-slate-300 rounded-2xl p-4 shadow-md shadow-slate-200/40 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Query by course module name or course code reference (e.g., IT-302)..."
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

        {/* 📋 Curriculum Directory Table */}
        <div className="bg-white border border-slate-300 rounded-2xl shadow-md shadow-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider">
                  <th className="py-3 px-5">Course Module</th>
                  <th className="py-3 px-4">Faculty Allocation</th>
                  <th className="py-3 px-4">Structure</th>
                  <th className="style-th py-3 px-4">Capacity Metric</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => {
                    const capacityPercentage = Math.min((course.enrolledStudents / course.maxCapacity) * 100, 100);
                    const isFull = course.enrolledStudents >= course.maxCapacity;

                    return (
                      <tr key={course.id} className="hover:bg-slate-50/80 transition-colors group">
                        
                        {/* Course Name & Code */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 border-2 border-slate-300 text-slate-700 flex items-center justify-center group-hover:border-emerald-500 transition-all">
                              <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                {course.title}
                              </div>
                              <span className="inline-block mt-0.5 text-xs font-mono font-bold bg-slate-100 border border-slate-300 px-1.5 py-0.2 rounded text-slate-700">
                                {course.courseCode}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Faculty */}
                        <td className="py-4 px-4">
                          <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-emerald-600" />
                            {course.faculty}
                          </div>
                        </td>

                        {/* Credits & Status */}
                        <td className="py-4 px-4 space-y-1.5">
                          <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {course.creditHours} Credit Hours
                          </div>
                          
                          {course.status === "Active" ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3" /> Production Live
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                              <AlertCircle className="w-3 h-3" /> Audit Phase
                            </span>
                          )}
                        </td>

                        {/* Enrolled Capacity Tracker */}
                        <td className="py-4 px-4 max-w-40">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="flex items-center gap-1 text-slate-600 font-medium">
                              <Users className="w-3.5 h-3.5 text-slate-400" />
                              {course.enrolledStudents}/{course.maxCapacity} Seats
                            </span>
                            {isFull && <span className="text-[10px] text-rose-600 font-extrabold uppercase">Full Cap</span>}
                          </div>
                          <div className="w-full bg-slate-200 border border-slate-300 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isFull ? "bg-rose-500" : "bg-linear-to-r from-emerald-500 to-teal-500"}`}
                              style={{ width: `${capacityPercentage}%` }}
                            />
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-right">
                          <button className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold border-2 border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-700 bg-white rounded-xl transition-all shadow-sm">
                            Manage <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                      No modules found matches your layout parameters.
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

export default CourseDirectory;