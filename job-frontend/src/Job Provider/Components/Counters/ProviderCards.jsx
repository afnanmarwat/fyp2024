import ProviderCard from "./ProviderCard";

import React from "react";
const ProviderCards = ({ stats, ...props }) => {
  return (
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        <div>
          <ProviderCard
            logo={<i className="bi bi-briefcase-fill"></i>}
            heading={"Total Jobs"}
            statistics={stats.jobsCount}
            animate={"animate-[rtl_0.3s]"}
          />
        </div>
        <div>
          <ProviderCard
            color="#ff1a1a"
            logo={<i className="bi bi-file-earmark-person-fill"></i>}
            heading={"Total Applicants"}
            statistics={stats.applicantsCount}
            animate={"animate-[rtl_0.6s]"}
          />
        </div>
      </div>
  );
};

export default ProviderCards;
