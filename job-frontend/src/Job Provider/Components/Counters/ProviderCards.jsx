import ProviderCard from "./ProviderCard";

import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import classes from "../../../components/dashboard/Counters/AdminCard.module.css";
const ProviderCards = ({ stats, ...props }) => {
  return (
      <div className="flex gap-5">
        <div>
          <ProviderCard
            logo={<i className="bi bi-briefcase-fill"></i>}
            heading={"Total Jobs"}
            statistics={stats.jobsCount}
            caption={""}
          />
        </div>
        <div>
          <ProviderCard
            color="#ff1a1a"
            logo={<i className="bi bi-file-earmark-person-fill"></i>}
            heading={"Total Applicants"}
            statistics={stats.applicantsCount}
            caption={""}
          />
        </div>
      </div>
  );
};

export default ProviderCards;
