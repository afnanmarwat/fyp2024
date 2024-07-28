import JobSeekerPage from "./pages/SeekerPages/JobSeekerPage";
import AppliedJobsPage from "./pages/SeekerPages/AppliedJobsPage";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Changepassword from "./components/UI/ChangePassword";
import Navigation from "./components/navigation/Navigation";
import React, { useState } from "react";
import Footer from "./components/footer/Footer";
import Profile from "./components/profile/Profile";
import ViewJobDetails from "./JobSeeker/ViewJobDetails";

export default function JobSeekerScreen() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    return setSidebar(!sidebar);
  }
  return (
    <React.Fragment>
      <div>
        <Navigation showSideBarProps={showSidebar}/>
        <div className={`${sidebar ? "translate-y-0" : "-translate-y-[50vh]"} absolute w-full max-h-[100%] z-30 transition-all duration-700`}>
          <div className="md:hidden flex flex-col gap-2 p-2 text-white font-semibold bg-gradient-to-r from-[#3fa1e8] to-[#1d81ca] rounded">
            <NavLink
              onClick={showSidebar}
              className="p-2 hover:bg-white hover:text-[#1d81ca] rounded-md transition-all duration-300 ease-in-out"
              to="/dashboard"
            >
              Home
            </NavLink>
            <NavLink
              onClick={showSidebar}
              className="p-2 hover:bg-white hover:text-[#1d81ca] rounded-md transition-all duration-300 ease-in-out"
              to="/appliedJobs"
            >
              Applied Jobs
            </NavLink>
            <NavLink
              onClick={showSidebar}
              className="p-2 hover:bg-white hover:text-[#1d81ca] rounded-md transition-all duration-300 ease-in-out"
              to="/"
            >
              Companies
            </NavLink>
          </div>
        </div>
        <div onClick={()=> {return setSidebar(false)}} className="relative min-h-[100vh]">
          <Routes>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />

            <Route path="/dashboard" element={<JobSeekerPage />} />
            <Route path="/appliedJobs" element={<AppliedJobsPage />} />
            <Route path="/viewJobDetails" element={<ViewJobDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<Changepassword />} />

            {/* </Route> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
