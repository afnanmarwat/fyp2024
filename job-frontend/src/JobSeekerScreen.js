import JobSeekerPage from "./pages/SeekerPages/JobSeekerPage";
import AppliedJobsPage from "./pages/SeekerPages/AppliedJobsPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Changepassword from "./components/UI/ChangePassword";
import Navigation from "./components/navigation/Navigation";
import React from "react";
import Footer from "./components/footer/Footer";
import Profile from "./components/profile/Profile";
import View_job_details from "./JobSeeker/View_job_details";

export default function JobSeekerScreen() {
  return (
    <React.Fragment>
      <Navigation />
      <div className="min-h-[100vh]">
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />

          <Route path="/dashboard" element={<JobSeekerPage />} />
          <Route path="/appliedJobs" element={<AppliedJobsPage />} />
          <Route path="/viewJobDetails" element={<View_job_details />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<Changepassword />} />

          {/* </Route> */}
        </Routes>
      </div>
      <Footer/>
    </React.Fragment>
  );
}
