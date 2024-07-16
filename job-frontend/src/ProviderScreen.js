import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, useState } from "react";
import SpinnerComponent from "./components/UI/SpinnerComponent";
import Layout from "./components/layout/Layout";
import Sidebar from "./Job Provider/Components/Table/Sidebar";
import { FaBars } from "react-icons/fa6";
// import ProvDashboard from "./pages/ProviderPages/ProvDashboard";
// import ApplicantsPage from "./pages/ProviderPages/ApplicantPage";

// import ReportPage from "./pages/ProviderPages/ReportPage";
// import Changepassword from "./components/UI/ChangePassword";

// import ManageJobsPage from "./pages/ProviderPages/ManageJobsPage";

const ProvDashboard = React.lazy(
  () => import("./pages/ProviderPages/ProvDashboard")
);
const ApplicantsPage = React.lazy(
  () => import("./pages/ProviderPages/ApplicantPage")
);
const ManageApplicantPage = React.lazy(
  () => import("./pages/ProviderPages/ManageApplicantPage")
);
const ViewShortlistedPage = React.lazy(
  () => import("./pages/ProviderPages/ViewShortlistedPage")
);
const ReportPage = React.lazy(() => import("./pages/ProviderPages/ReportPage"));
const Changepassword = React.lazy(
  () => import("./components/UI/ChangePassword")
);
const ManageJobsPage = React.lazy(
  () => import("./pages/ProviderPages/ManageJobsPage")
);

export default function ProviderScreen() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="relative flex bg-[#f9f9f9]">
      {/* sidebar Section */}
      {/* sidebar for large devices */}
      <div className="hidden lg:block z-50 min-w-[18%]">
        <Sidebar />
      </div>
      {/* sidebar for small devices */}
      <div
        className={` ${sidebar ? "translate-x-0" : "-translate-x-[100vw]"} fixed left-0 top-0 lg:hidden z-50 
        xs:min-w-[100%] sm:min-w-[40%] lg:min-w-[18%] transition-all ease-in-out duration-500`}>
        <Sidebar showSidebarProps={showSidebar} />
      </div>
      {/* empty background div for small devices */}
      <div
        onClick={showSidebar}
        className={`${sidebar ? "translate-x-0" : "-translate-x-[100vw]"} fixed
        top-0 left-0 xs:hidden sm:block lg:hidden w-[100vw] h-[100vh] bg-[#0000006b] z-40 transition-all ease-in-out duration-500`}
      ></div>
      {/* layout section */}
      <div className=" absolute lg:relative w-full min-w-[80%] ">
        <Layout className="flex">
          {/* Sidebar icon in small devices */}
          <div className="inline-block lg:hidden xs:p-3 lg:px-10">
            <div
              onClick={() => {
                return setSidebar(true);
              }}
              className="p-2 border-1 border-[#2085cf] rounded-md hover:bg-[#2085cf] hover:text-white hover:cursor-pointer"
            >
              <FaBars className="lg:hidden" />
            </div>
          </div>
          <Suspense fallback={<SpinnerComponent />}>
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate replace to="/dashboard" />}
              />
              <Route exact path="/dashboard" element={<ProvDashboard />} />

              <Route exact path="/manage-jobs" element={<ManageJobsPage />} />
              <Route
                exact
                path="/manage-applicants"
                element={<ApplicantsPage />}
              />
              <Route
                exact
                path="/manage-applicants/:jobId"
                element={<ManageApplicantPage />}
              />
              <Route
                exact
                path="/view-shortlists/:jobId"
                element={<ViewShortlistedPage />}
              />

              <Route exact path="provider-report" element={<ReportPage />} />

              <Route path="/change-password" element={<Changepassword />} />

              {/* </Route> */}
            </Routes>
          </Suspense>
        </Layout>
      </div>
    </div>
  );
}
