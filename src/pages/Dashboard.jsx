import { useState, useEffect } from "react";
import { useAttendanceStore } from "../store/attendanceStore";
import EmployeeDetails from "../components/EmployeeDetails";
import TodaySummary from "../components/TodaySummary";
import BreakTime from "../components/BreakTime";
import Navbar from "../components/Navbar";
import EmpSidebar from "../components/sidebar/EmpSidebar";
import WeeklyStatusChart from "../components/WeeklyStatusChart";
 
import { ROUTES } from "../constants/routes";
import CalendarGrid from "../components/calendar/CalendarGrid";
 
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState(ROUTES.DASHBOARD);
 
  const resumeTimer = useAttendanceStore((state) => state.resumeTimer);
  useEffect(() => {
    resumeTimer();
  }, [resumeTimer]);
 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Navbar */}
      <header className="w-full fixed top-0 left-0 z-50 shadow-md bg-white">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>
 
      <div className="flex flex-1 pt-[70px] h-[calc(100vh-70px)]">
        {/* Sidebar */}
        <div
          className={`fixed top-[70px] left-0 h-[calc(100vh-70px)] transition-all duration-300 z-40 bg-white shadow-md overflow-hidden ${
            isSidebarOpen ? "w-64" : "w-0"
          }`}
        >
          <EmpSidebar
            isOpen={isSidebarOpen}
            onNavigate={setActivePage}
            activePage={activePage}
          />
        </div>
 
        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 overflow-y-auto p-4 sm:p-6 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6">
            {activePage === ROUTES.DASHBOARD && (
              <div className="flex flex-col gap-6">
                {/* Top Row */}
                <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-6">
                  <div className="col-span-1 sm:col-span-3 lg:col-span-3 bg-white p-4 rounded-xl shadow-md">
                    <EmployeeDetails />
                  </div>
                  <div className="col-span-1 sm:col-span-3 lg:col-span-3 bg-white p-4 rounded-xl shadow-md">
                    <BreakTime />
                  </div>
                  <div className="col-span-1 sm:col-span-6 lg:col-span-6 bg-white p-4 rounded-xl shadow-md">
                    <TodaySummary />
                  </div>
                </div>
 
                {/* Bottom Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
                  <div className="col-span-1 sm:col-span-1 lg:col-span-6 bg-white p-4 rounded-xl shadow-md">
                    <WeeklyStatusChart />
                  </div>
                  <div className="col-span-1 sm:col-span-1 lg:col-span-6 bg-white p-4 rounded-xl shadow-md pointer-events-none">
                    <CalendarGrid />
                  </div>
                </div>
              </div>
            )}
 
            {/* Other Pages */}
            {activePage === ROUTES.CALENDARGRID && (
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full">
                <CalendarGrid />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
