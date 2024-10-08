import React, { useEffect, useState } from "react";
import AdminCards from "../../components/dashboard/Counters/AdminCards";
import JobsTable from "../../components/dashboard/Tables/JobsTable";
import axios from "axios";
import Config from "../../config/Config.json";
import SpinnerComponent from "../../components/UI/SpinnerComponent";

const AdminDashboardPage = () => {
  const [userData, setUserData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [stats, setStats] = useState({
    jobCount: 0,
    providerCount: 0,
    applicantCount: 0,
    seekerCount: 0,
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = Config.TITLE.DASHBOARD;
    setShowSpinner(true);

    axios
      .get(`${Config.SERVER_URL + "admin/dashboard-stats"}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setShowSpinner(false);
        setStats(res.data.stats);
      });
    axios
      .get(`${Config.SERVER_URL + "admin/dashboard-recents"}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setShowSpinner(false);
        setUserData(res.data.recentUsers);
        setJobData(res.data.recentJobs);
      });
  }, [token]);
  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        <h6 className="text-3xl sm:text-4xl text-[#545454] font-bold lg:pt-4">Admin Dashborad</h6>
        <AdminCards stats={stats} />
        {showSpinner && <SpinnerComponent />}
        {!showSpinner && (
          <>
            {/* <UserTable usersData={userData} /> */}
            <JobsTable jobData={jobData} />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default AdminDashboardPage;
