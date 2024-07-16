import React, { useState, useEffect } from "react";
// import { Row, Col, Table, Container } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import TableFooter from "../Table/TableFooter";
import useTable from "../Hooks/useTable";

import SpinnerComponent from "../../../components/UI/SpinnerComponent";
// import classes from "./ApplicantTab.module.css";
import JobApplicantItem from "./JobApplicantItem";
import Config from "../../../config/Config.json";
let jobdata = [];

const ManageTab = () => {
  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  const { slice, range } = useTable(jobData, page, 5);

  useEffect(() => {
    axios
      .get(`${Config.SERVER_URL + "provider/jobs"}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data.jobs;
        setShowSpinner(false);
        jobdata = [...data];
        setJobData(data);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
  }, []);

  const searchJobHandler = (event) => {
    setJobData(
      jobdata.filter((job) =>
        job.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  return (
    <>
      <div className=" xs:p-3 lg:px-10 lg:pt-10">
        {/* Search section  */}
        <div className="flex justify-center">
          <div className="xs:w-full sm:w-[50%] flex flex-row justify-between items-center bg-white rounded-xl xs:px-2 md:px-3 lg:px-2 py-2 shadow-xl border-1 border-[#2085cf]">
            {/* search input */}
            <input
              className="w-full focus:outline-none focus:border-none  text-md tracking-wider"
              type="search"
              id="search"
              onChange={searchJobHandler}
              placeholder="Search Applicants"
            ></input>
            {/* search icon*/}
            <IoSearch className="text-[#2085cf] xs:text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
          </div>
        </div>
        {/* Title */}
        <div>
          <h6 className="text-2xl text-[#545454] py-4 font-bold whitespace-nowrap">Manage Applicants</h6>
        </div>
        {/* Table section*/}
        {jobData.length > 0 && (
          <div>
            <div className="rounded-3xl shadow-md overflow-auto">
              {showSpinner && <SpinnerComponent />}

              <table className="w-[100%]">
                <thead className="bg-gradient-to-r from-[#57b7fc] to-[#2085cf] border-b-0 ">
                  <tr className="text-white border-0 text-lg">
                    <th className="font-medium px-4 py-3 whitespace-nowrap">Job Title</th>
                    <th className="font-medium px-4 py-3 whitespace-nowrap">Applicants</th>
                    <th className="font-medium px-4 py-3 whitespace-nowrap">Shortlisted</th>
                  </tr>
                </thead>
                <tbody>
                  {slice.map((jobItem) => {
                    return (
                      <JobApplicantItem key={jobItem._id} jobItem={jobItem} />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <TableFooter
              range={range}
              slice={slice}
              setPage={setPage}
              page={page}
            />
          </div>
        )}

        {jobData.length === 0 && <h3>No job Data!</h3>}
      </div>
      {/* <Container>
        <Row className={classes.rowStyle}>
          <Col className={`${classes.manageUsers} col-md-3`}>
            <span className={classes.span}>Manage Applicants</span>
          </Col>
          <Col className={`${classes.col} col-md-6  `}>
            <Col className="d-flex justify-content-center align-items-center">
              <input
                type="text"
                id="search"
                placeholder="Search Applicants"
                className={classes.searchBar}
                onChange={searchJobHandler}
              />
            </Col>
          </Col>
        </Row>
      </Container>
      {jobData.length > 0 && (
        <Container>
          <div className={classes.tableBox}>
            {showSpinner && <SpinnerComponent />}

            <Table striped hover>
              <thead>
                <tr className={classes.tableHeader}>
                  <th>Job Title</th>
                  <th>Applicants</th>
                  <th>Shortlisted</th>
                </tr>
              </thead>
              <tbody className={classes.tableBody}>
                {slice.map((jobItem) => {
                  return (
                    <JobApplicantItem key={jobItem._id} jobItem={jobItem} />
                  );
                })}
              </tbody>
            </Table>
          </div>
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </Container>
      )}

      {jobData.length === 0 && <h3>No job Data!</h3>} */}
    </>
  );
};

export default ManageTab;
