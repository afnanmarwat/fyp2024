import AdminCard from "./AdminCard";

import React from "react";
// import { Col, Row } from "react-bootstrap";

// import userData from "../../../store/userData.json";
// import jobData from "../../../store/jobData.json";

const AdminCards = ({ stats, ...props }) => {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div>
        <AdminCard
          logo={<i className="bi bi-briefcase-fill"></i>}
          heading={"Total Jobs"}
          statistics={stats.jobCount}
          animate={"animate-[rtl_0.3s]"}
        />
      </div>
      <div>
        <AdminCard
          color="#fa3535"
          logo={<i className="bi bi-file-earmark-person-fill"></i>}
          heading={"Total Applicants"}
          statistics={stats.applicantCount}
          animate={"animate-[rtl_0.6s]"}
        />
      </div>
      <div>
        <AdminCard
          color="#00b359"
          logo={<i className="bi bi-person-check-fill"></i>}
          heading={"Total Job Providers"}
          statistics={stats.providerCount}
          animate={"animate-[rtl_1s]"}
        />
      </div>
      <div>
        <AdminCard
          color="#ff5500"
          logo={<i className="bi bi-person-circle"></i>}
          heading={"Total Job Seeker"}
          statistics={stats.seekerCount}
          animate={"animate-[rtl_1.3s]"}
        />
      </div>
    </div>
  );
};

export default AdminCards;
