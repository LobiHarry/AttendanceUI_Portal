import { useState, useEffect } from "react";
import { useAttendanceStore } from "../store/attendanceStore";

import EmployeeDetails from "../components/EmployeeDetails";
import TodaySummary from "../components/TodaySummary";
import BreakTime from "../components/BreakTime";
import Navbar from "../components/Navbar";
import EmpSidebar from "../components/sidebar/EmpSidebar";
import WeeklyStatusChart from "../components/WeeklyStatusChart";
import Admin from "../components/admin/Admin";
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

      <div className="flex flex-1 pt-[70px] h-[calc(100vh-70px)] overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed top-[70px] left-0 h-[calc(100%-70px)] transition-all duration-300 z-40 overflow-hidden ${
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
        <div
          className={`flex-1 transition-all duration-300 overflow-auto p-4 flex justify-center ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <div className="w-full max-w-[1600px] flex flex-col items-center gap-6">
            {activePage === ROUTES.DASHBOARD && (
              <div className="grid grid-cols-12 gap-6 w-[96%]">
                {/* Top Row */}
                <div className="col-span-12 lg:col-span-3 bg-white p-4 rounded-xl shadow-md">
                  <EmployeeDetails />
                </div>
                <div className="col-span-12 lg:col-span-3 bg-white p-4 rounded-xl shadow-md">
                  <BreakTime />
                </div>
                <div className="col-span-12 lg:col-span-6 bg-white p-4 rounded-xl shadow-md">
                  <TodaySummary />
                </div>

                {/* Bottom Row */}
                <div className="col-span-12 lg:col-span-6 bg-white p-4 rounded-xl shadow-md">
                  <WeeklyStatusChart />
                </div>
                <div className="col-span-12 lg:col-span-6 bg-white p-4 rounded-xl shadow-md pointer-events-none">
                  <CalendarGrid />
                </div>
              </div>
            )}

            {/* Other Pages */}
            {activePage === ROUTES.CALENDARGRID && (
              <div className="bg-white p-6 rounded-xl shadow-md w-[96%]">
                <CalendarGrid />
              </div>
            )}

            {activePage === ROUTES.ADMIN && (
              <div className="bg-white p-6 rounded-xl shadow-md w-[96%]">
                <Admin />
              </div>
            )}

            {activePage === ROUTES.LEAVE && (
              <div className="bg-white p-6 rounded-xl shadow-md w-[96%]">
                <h2 className="text-xl font-semibold">Leave Request Page</h2>
              </div>
            )}

            {activePage === ROUTES.CORRECTION && (
              <div className="bg-white p-6 rounded-xl shadow-md w-[96%]">
                <h2 className="text-xl font-semibold">
                  Corrections Request Page
                </h2>
              </div>
            )}

            {activePage === ROUTES.PERMISSION && (
              <div className="bg-white p-6 rounded-xl shadow-md w-[96%]">
                <h2 className="text-xl font-semibold">
                  Permission Request Page
                </h2>
              </div>
            )}

            {activePage === ROUTES.RESET && (
              <div className="bg-white p-6 rounded-xl shadow-md w-[96%]">
                <h2 className="text-xl font-semibold">
                  Check-in Reset Request Page
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
