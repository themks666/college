import { Route, Routes } from "react-router-dom";
import DashboardOverview from "./pages/Dashboard";
import Register from "./pages/Register";
import AdminSidebar from "./components/sidebar";
import StudentDirectory from "./pages/Studentss";
import CourseDirectory from "./pages/Courses";
import SettingsPage from "./pages/settings";
export default function PremiumStudentForm() {
  return (
    <div className="flex">
      <AdminSidebar></AdminSidebar>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/students" element={<StudentDirectory></StudentDirectory>}></Route>
        <Route path="/courses" element={<CourseDirectory></CourseDirectory>}></Route>
        <Route path="/settings" element={<SettingsPage></SettingsPage>}></Route>
        <Route
          path="/dashboard"
          element={
            <DashboardOverview
              onNavigateToRegister={() => {
                console.log("hello world");
              }}
            ></DashboardOverview>
          }
        ></Route>
      </Routes>
    </div>
  );
}
