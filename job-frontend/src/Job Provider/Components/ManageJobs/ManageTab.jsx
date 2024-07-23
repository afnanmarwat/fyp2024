import React, { useState, useEffect } from "react";
// import { Row, Col, Button, Table, Container } from "react-bootstrap";
import axios from "axios";
// import { BsSearch } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import SpinnerComponent from "../../../components/UI/SpinnerComponent";
import "./Data.json";
import TableFooter from "../Table/TableFooter";
import useTable from "../Hooks/useTable";
import Config from "../../../config/Config.json";

// import classes from "./ManageTab.module.css";
import JobItem from "./JobItem";

const ManageTab = (props) => {
  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState([]);
  const [staticJobData, setStaticJobData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  const { slice, range } = useTable(jobData, page, 5);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${Config.SERVER_URL + "provider/jobs"}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setShowSpinner(false);

      const jobData = response.data.jobs;
      // console.log(data);
      setJobData(jobData);
      setStaticJobData(jobData);
    };
    getData();
  }, [props.changes, token]); //props.changes

  const searchJobHandler = (event) => {
    setJobData(
      staticJobData.filter((job) =>
        job.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  const addModalHandler = () => {
    props.onShowAddUser({ show: true, edit: false });
  };
  const editModalHandler = (jobData) => {
    props.onEditJob(jobData);
  };
  return (
    <>
      <div className="xs:p-3 lg:px-10 lg:pt-10">
        {/* Search section  */}
        <div className="flex justify-center">
          <div className="xs:w-full sm:w-[50%] flex flex-row justify-between items-center bg-white rounded-xl xs:px-2 md:px-3 lg:px-2 py-2 shadow-xl border-1 border-[#2085cf]">
            {/* search input */}
            <input
              className="w-full focus:outline-none focus:border-none  text-md tracking-wider"
              type="search"
              id="search"
              onChange={searchJobHandler}
              placeholder="Search Jobs"
            ></input>
            {/* search icon*/}
            <IoSearch className="text-[#2085cf] xs:text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
          </div>
        </div>
        {/* Title and Add job btn */}
        <div className="flex justify-between items-center text-white">
          <h6 className="text-2xl text-[#545454] py-4 font-bold whitespace-nowrap">Manage Jobs</h6>
          <button
            id="add-new-user"
            onClick={addModalHandler}
            className="p-2 rounded-xl bg-gradient-to-r from-[#57b7fc] to-[#2085cf] hover:from-white hover:to-white  
          hover:text-[#686868] font-medium shadow transition-all ease-in-out border-1 hover:border-[#2085cf]"
          >
            Add New Job
          </button>
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
                    <th className="font-medium px-4 py-3 whitespace-nowrap">Job Description</th>
                    <th className="font-medium px-4 py-3 whitespace-nowrap">Category</th>
                    <th className="font-medium px-4 py-3 whitespace-nowrap">Start Date</th>
                    <th className="font-medium px-4 py-3 whitespace-nowrap">End Date</th>
                    <th className="font-medium px-4 py-3 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slice.map((job) => {
                    return (
                      <JobItem
                        token={token}
                        key={job._id}
                        jobInfo={job}
                        onEdit={editModalHandler}
                        onDelete={props.onShowDelete}
                      />
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

        {jobData.length === 0 && <h3>No Jobs Data!</h3>}
      </div>
      {/* <Container>
        <Row className={classes.rowStyle}>
          <Col className={`${classes.manageUsers} col-md-3`}>
            <span className={classes.span}>Manage Jobs</span>
          </Col>
          <Col className={`${classes.col} col-md-6  `}>
            <Col className="d-flex justify-content-center align-items-center">
              <input
                type="text"
                id="search"
                placeholder="Search Jobs"
                className={classes.searchBar}
                onChange={searchJobHandler}
              />
            </Col>
          </Col>
          <Col className={`${classes.addUser} col-md-3`}>
            <Button
              variant="primary"
              id="add-new-user"
              className={classes.button}
              onClick={addModalHandler}
            >
              Add New Job
            </Button>
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
                  <th> Job Title</th>
                  <th>Job Description</th>
                  <th>Category</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className={classes.tableBody}>
                {slice.map((job) => {
                  return (
                    <JobItem
                      token={token}
                      key={job._id}
                      jobInfo={job}
                      onEdit={editModalHandler}
                      onDelete={props.onShowDelete}
                    />
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

      {jobData.length === 0 && <h3>No Jobs Data!</h3>} */}
    </>
  );
};

export default ManageTab;
