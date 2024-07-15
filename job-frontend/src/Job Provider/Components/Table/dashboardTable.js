import React from "react";
// import classes from "./Table.module.css";
import JobItem from "../../../components/dashboard/Tables/JobItem";
// import classes from "../ManageJobs/ManageTab.module.css";
import { useNavigate } from "react-router-dom";
// import { Table, Row, Col, Button } from "react-bootstrap";

const Table1 = (props) => {
  const navigate = useNavigate();
  const recentJobsHandler = () => {
    navigate("/manage-jobs");
  };
  return (
    <React.Fragment>
      <div>
        {/* Heading and View Btn */}
        <div className="flex justify-between items-center py-2">
          <h4 className="text-xl font-bold text-[#686868]">
            Applicant Details
          </h4>
          {/* view all btn */}
          <button className="p-2 rounded-xl bg-gradient-to-r from-[#57b7fc] to-[#2085cf] hover:from-white hover:to-white  
          hover:text-[#686868] font-medium shadow transition-all ease-in-out border-1 hover:border-[#2085cf]" onClick={recentJobsHandler}>
            View All
          </button>
        </div>
        {/* table */}
        <div className="rounded-3xl shadow-md overflow-auto">
          <table>
            <thead className="bg-gradient-to-r from-[#57b7fc] to-[#2085cf] border-b-0 ">
              <tr className="text-white border-0 text-lg">
                <th className="font-medium px-4 py-3 whitespace-nowrap">Title</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Category</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Location</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Qualification</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Positions</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">First Created</th>
                <th className="font-medium px-4 py-3 whitespace-nowrap ">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {props.jobData.map((job) => (
                <JobItem jobInfo={job} key={job._id} />
              ))}
            </tbody>
          </table>
          {props.jobData.length === 0 && (
            <p className="text-center fw-bold">No jobs data!</p>
          )}
        </div>
      </div>
      {/* <Row >
        <Col>
          <span className={`${classes.span} float-start`}>Recent Jobs</span>
        </Col>
        <Col>
          <Button
            className={`${classes.button} float-end`}
            onClick={recentJobsHandler}
          >
            View All
          </Button>
        </Col>
      </Row>
      <div className={classes.tableBox}>
        <Table striped hover>
          <thead>
            <tr className={classes.tableHeader}>
              <th>Title</th>
              <th>Category</th>
              <th>First Created</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {props.jobData.map((job) => (
              <JobItem jobInfo={job} key={job._id} />
            ))}
          </tbody>
        </Table>
        {props.jobData.length === 0 && (
          <p className="text-center fw-bold">No jobs data!</p>
        )}
      </div> */}
    </React.Fragment>
  );
};

export default Table1;
