import React from "react";
import { useState, useEffect, useRef } from "react";
// import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import Jobitem from "./Job_item";
// import classes from "./Modalf.module.css";
import Config from "../config/Config.json";
import { IoSearch } from "react-icons/io5";


let jobsData = [];
const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const statusInputRef = useRef();
  const statusChangeHandler = (event) => {
    if (event.target.value === "All") {
      setJobs(jobsData);
    } else {
      setJobs(
        jobsData.filter((job) => job.status.includes(event.target.value))
      );
    }
  };

  const jobSearchHandler = (event) => {
    const status = statusInputRef.current.value;
    if (status === "All") {
      setJobs(
        jobsData.filter((job) =>
          job.title.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    } else {
      setJobs(
        jobsData.filter(
          (job) =>
            job.title
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) &&
            job.status.includes(status)
        )
      );
    }
  };

  useEffect(() => {
    axios
      .get(`${Config.SERVER_URL + "user/jobsApplied"}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        jobsData = response.data.jobsApplied;
        setJobs(response.data.jobsApplied);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-5 h-[100vh]">
      <div className=" flex items-center justify-center">
        <div className="flex w-full  items-center justify-between gap-2">
          {/* search Section */}
          <div className="w-[80%] flex flex-row justify-between items-center bg-white rounded-xl sm:px-2 md:px-3 lg:px-2 py-2 shadow-xl border-1 border-[#1a75e8]">
            {/* search input */}
            <input
              className="w-full focus:outline-none focus:border-none xs:text-xs sm:text-[16px] tracking-wider"
              type="search"
              onChange={jobSearchHandler}
              placeholder="Search for Applied Jobs"
            ></input>
            {/* search icon*/}
            <IoSearch className="text-[#1a75e8] xs:text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
          </div>
          {/* Select */}
          <div className="w-[15%] bg-white rounded-xl sm:px-2 md:px-3 lg:px-2 py-2 shadow-xl border-1 border-[#1a75e8]">
            <select
              className="w-full focus:outline-none focus:border-none xs:text-xs md:text-[16px] tracking-wider"
              type="select"
              onChange={statusChangeHandler}
              ref={statusInputRef}
            >
              <option value="All">All</option>
              <option value="Applied">Applied Only</option>
              <option value="Shortlisted">Shortlisted Only</option>
            </select>
          </div>
        </div>
      </div>
      {/* applied jobs */}
      <div className="pt-5">
        <h5 className="pb-4 font-bold text-[#0f1137] text-2xl xl:text-3xl">Applied Jobs</h5>
        <div className="flex flex-col gap-3 w-[80%]">
          {jobs.map((jobItem) => (
            <Jobitem key={jobItem._id} item={jobItem} />
          ))}
        </div>
      </div>
      {/* <Container>
        <Row >
          <Col sm={6}>
            <input
              className="form-control float-end"
              type="search"
              onChange={jobSearchHandler}
              placeholder="Search Jobs"
            ></input>
          </Col>
          <Col sm={6}>
            <select
              className="form-control float-end"
              type="select"
              onChange={statusChangeHandler}
              ref={statusInputRef}
            >
              <option value="All">All</option>
              <option value="Applied">Applied Only</option>
              <option value="Shortlisted">Shortlisted Only</option>
            </select>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <div className={classes.grid}>
          {jobs.map((jobItem) => (
            <Jobitem key={jobItem._id} item={jobItem} />
          ))}
        </div>
      </Container> */}
    </div>
  );
};

export default AppliedJobs;
