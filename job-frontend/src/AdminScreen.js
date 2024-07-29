import "./App.css";
import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import SpinnerComponent from "./components/UI/SpinnerComponent";
import Sidebar from "./Job Provider/Components/Table/Sidebar";
import { FaBars } from "react-icons/fa6";
// import AdminDashboardPage from "./pages/AdminPages/AdminDashboardPage";
// import PageNotFound from "./pages/AdminPages/PageNotFound";
// import ManageUsersPage from "./pages/AdminPages/ManageUsersPage";
import ManageProviderPage from "./pages/AdminPages/ManageProviderPage";
// import ReportsPage from "./pages/AdminPages/ReportsPage";
// import ChangePassword from "./components/UI/ChangePassword";

const AdminDashboardPage = React.lazy(() =>
  import("./pages/AdminPages/AdminDashboardPage")
);
const PageNotFound = React.lazy(() =>
  import("./pages/AdminPages/PageNotFound")
);
const ManageUsersPage = React.lazy(() =>
  import("./pages/AdminPages/ManageUsersPage")
);
// const ManageProviderPage = React.lazy(() =>
//   import("./pages/AdminPages/ManageProviderPage")
// );
const ManageJobsPage = React.lazy(() =>
  import("./pages/AdminPages/ManageJobsPage")
);
const ReportsPage = React.lazy(() => import("./pages/AdminPages/ReportsPage"));
const ChangePassword = React.lazy(() =>
  import("./components/UI/ChangePassword")
);

function AdminScreen() {
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
      <div className=" absolute lg:relative w-full min-w-[80%] min-h-[100vh] xs:p-3 lg:px-10">
        <Layout className="flex">
          {/* Sidebar icon in small devices */}
          <div className="inline-block lg:hidden xs:py-1">
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
              <Route path="/" element={<Navigate replace to="/dashboard" />} />

              <Route path="/dashboard" element={<AdminDashboardPage />} />

              <Route path="/manage-users" element={<ManageUsersPage />} />
              <Route path="/provider" element={<ManageProviderPage />} />

              <Route path="/manage-jobs" element={<ManageJobsPage />} />

              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/change-password" element={<ChangePassword />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </div>
    </div>

  );
}

export default AdminScreen;
