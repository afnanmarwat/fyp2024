import JobSeekerPage from "./pages/SeekerPages/JobSeekerPage";
import AppliedJobsPage from "./pages/SeekerPages/AppliedJobsPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Changepassword from "./components/UI/ChangePassword";
import Navigation from "./components/navigation/Navigation";
import React from "react";

export default function JobSeekerScreen() {
  return (
    <React.Fragment>
      <Navigation />
      <div>
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />

          <Route path="/dashboard" element={<JobSeekerPage />} />
          <Route path="/appliedJobs" element={<AppliedJobsPage />} />
          <Route path="/change-password" element={<Changepassword />} />

          {/* </Route> */}
        </Routes>
      </div>
    </React.Fragment>
  );
}
